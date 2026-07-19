import { createPublicClient, createWalletClient, custom, decodeEventLog, formatUnits, isAddress, parseUnits, type Address } from 'viem'

declare global {
  interface Window { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }
}

const chainId = 10143
const chainIdHex = '0x279f'
const configuredFlow = import.meta.env.VITE_WALLETFLOW_ADDRESS as string | undefined
const configuredToken = import.meta.env.VITE_PAYMENT_TOKEN_ADDRESS as string | undefined

export const onchainReady = Boolean(configuredFlow && configuredToken && isAddress(configuredFlow) && isAddress(configuredToken))
export const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL || 'dUSDC'
const monadTestnet = { id: chainId, name: 'Monad Testnet', nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 }, rpcUrls: { default: { http: ['https://testnet-rpc.monad.xyz'] } } } as const

const flowAbi = [
  { type: 'function', name: 'createLink', stateMutability: 'nonpayable', inputs: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint256' }, { name: 'recipients', type: 'tuple[]', components: [{ name: 'wallet', type: 'address' }, { name: 'bps', type: 'uint16' }] }], outputs: [{ name: 'linkId', type: 'uint256' }] },
  { type: 'function', name: 'pay', stateMutability: 'nonpayable', inputs: [{ name: 'linkId', type: 'uint256' }], outputs: [] },
  { type: 'function', name: 'getLink', stateMutability: 'view', inputs: [{ name: 'linkId', type: 'uint256' }], outputs: [{ name: 'owner', type: 'address' }, { name: 'token', type: 'address' }, { name: 'amount', type: 'uint256' }, { name: 'active', type: 'bool' }, { name: 'recipients', type: 'tuple[]', components: [{ name: 'wallet', type: 'address' }, { name: 'bps', type: 'uint16' }] }] },
  { type: 'event', name: 'LinkCreated', inputs: [{ indexed: true, name: 'linkId', type: 'uint256' }, { indexed: true, name: 'owner', type: 'address' }, { indexed: true, name: 'token', type: 'address' }, { indexed: false, name: 'amount', type: 'uint256' }], anonymous: false },
] as const

const tokenAbi = [{ type: 'function', name: 'approve', stateMutability: 'nonpayable', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ name: '', type: 'bool' }] }] as const

const provider = () => {
  if (!window.ethereum) throw new Error('Install MetaMask or another browser wallet first.')
  return window.ethereum
}

async function accountAndClient() {
  const wallet = provider()
  const accounts = await wallet.request({ method: 'eth_requestAccounts' }) as string[]
  const activeChain = await wallet.request({ method: 'eth_chainId' }) as string
  if (activeChain.toLowerCase() !== chainIdHex) {
    await wallet.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chainIdHex }] })
  }
  return { account: accounts[0] as Address, client: createWalletClient({ chain: monadTestnet, transport: custom(wallet as never) }) }
}

async function waitForReceipt(hash: `0x${string}`) {
  const wallet = provider()
  for (let attempts = 0; attempts < 50; attempts++) {
    const receipt = await wallet.request({ method: 'eth_getTransactionReceipt', params: [hash] }) as { logs: unknown[] } | null
    if (receipt) return receipt
    await new Promise(resolve => window.setTimeout(resolve, 1200))
  }
  throw new Error('Transaction is still pending. Check it in your wallet.')
}

export async function connectWallet() {
  const { account } = await accountAndClient()
  return account
}

export async function createPaymentLink(amount: string, recipients: Array<{ wallet: string; percentage: number }>) {
  if (!onchainReady) throw new Error('Add your deployed contract addresses to .env before creating a live link.')
  if (!recipients.length || recipients.some(r => !isAddress(r.wallet))) throw new Error('Every destination needs a complete wallet address.')
  if (recipients.reduce((total, r) => total + r.percentage, 0) !== 100) throw new Error('Destination percentages must total exactly 100%.')
  const { account, client } = await accountAndClient()
  const value = parseUnits(amount.replace(/,/g, ''), 6)
  const hash = await client.writeContract({ account, address: configuredFlow as Address, abi: flowAbi, functionName: 'createLink', args: [configuredToken as Address, value, recipients.map(r => ({ wallet: r.wallet as Address, bps: r.percentage * 100 }))] })
  const receipt = await waitForReceipt(hash)
  const log = receipt.logs.map(log => {
    try { return decodeEventLog({ abi: flowAbi, data: (log as { data: `0x${string}` }).data, topics: (log as { topics: [`0x${string}`, ...`0x${string}`[]] }).topics }) } catch { return null }
  }).find(Boolean)
  return { hash, linkId: String((log as { args?: { linkId?: bigint } } | undefined)?.args?.linkId ?? '') }
}

export async function getPaymentLink(linkId: string) {
  if (!configuredFlow || !isAddress(configuredFlow)) throw new Error('Add your WalletFlow address to .env before opening a live link.')
  const client = createPublicClient({ chain: monadTestnet, transport: custom(provider() as never) })
  const [owner, token, amount, active, recipients] = await client.readContract({ address: configuredFlow, abi: flowAbi, functionName: 'getLink', args: [BigInt(linkId)] })
  return { owner, token, amount: formatUnits(amount, 6), active, recipients: recipients.map((recipient, index) => ({ label: `Destination ${index + 1}`, wallet: recipient.wallet, percentage: Number(recipient.bps) / 100 })) }
}

export async function payPaymentLink(linkId: string, amount: string) {
  if (!onchainReady) throw new Error('Add your deployed contract addresses to .env before making a live payment.')
  if (!linkId) throw new Error('Create a payment link first.')
  const { account, client } = await accountAndClient()
  const value = parseUnits(amount.replace(/,/g, ''), 6)
  const approval = await client.writeContract({ account, address: configuredToken as Address, abi: tokenAbi, functionName: 'approve', args: [configuredFlow as Address, value] })
  await waitForReceipt(approval)
  const hash = await client.writeContract({ account, address: configuredFlow as Address, abi: flowAbi, functionName: 'pay', args: [BigInt(linkId)] })
  await waitForReceipt(hash)
  return hash
}
