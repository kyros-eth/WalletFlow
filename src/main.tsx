import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Check, Copy, ExternalLink, AlertTriangle, Plus, ShieldCheck, Sparkles, SplitSquareHorizontal, Wallet } from 'lucide-react'
import { addDemoTokenToWallet, connectWallet, createPaymentLink, getDemoTokenBalance, getPaymentLink, mintDemoTokens, onchainReady, payPaymentLink, tokenAddress, tokenSymbol } from './onchain'
import './styles.css'

type Allocation = { label: string; wallet: string; percentage: number; color: string }
const initial: Allocation[] = [
  { label: 'Vault', wallet: '0x71a9...c640', percentage: 45, color: '#9c8cff' },
  { label: 'Designer', wallet: '0x48ba...2af1', percentage: 20, color: '#62d7bc' },
  { label: 'Tax reserve', wallet: '0x2d7e...9e01', percentage: 15, color: '#f6b15d' },
  { label: 'Operating', wallet: '0xae10...f91c', percentage: 20, color: '#72a8ff' },
]

function App() {
  const [allocations, setAllocations] = useState(initial)
  const [amount, setAmount] = useState('1,000')
  const [created, setCreated] = useState(false)
  const [paid, setPaid] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [linkId, setLinkId] = useState('')
  const [txHash, setTxHash] = useState('')
  const sharedLinkId = new URLSearchParams(location.search).get('link')
  const [notice, setNotice] = useState(onchainReady ? (sharedLinkId ? 'Connect your wallet to load this payment split.' : '') : 'Demo mode: add your deployed contract addresses to .env to enable live payments.')
  const [busy, setBusy] = useState(false)
  const [minting, setMinting] = useState(false)
  const [addingToken, setAddingToken] = useState(false)
  const total = allocations.reduce((sum, a) => sum + a.percentage, 0)
  const update = (i: number, key: keyof Allocation, value: string | number) => setAllocations(a => a.map((item, index) => index === i ? { ...item, [key]: value } : item))
  const add = () => setAllocations(a => [...a, { label: 'New wallet', wallet: '0x0000...0000', percentage: 0, color: '#ec78b8' }])
  const loadSharedLink = async () => {
    if (!sharedLinkId) return
    setBusy(true); setNotice('Loading live payment split…')
    try {
      const link = await getPaymentLink(sharedLinkId)
      setAmount(link.amount)
      setAllocations(link.recipients.map((recipient, index) => ({ ...recipient, color: initial[index % initial.length].color })))
      setLinkId(sharedLinkId); setCreated(true)
      setNotice(link.active ? `Live payment split #${sharedLinkId} loaded.` : 'This payment split has already been paid.')
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Could not load payment split.') }
    finally { setBusy(false) }
  }
  const handleConnect = async () => {
    try { setWalletAddress(await connectWallet()); await loadSharedLink(); if (!sharedLinkId) setNotice('Wallet connected on Monad Testnet.') }
    catch (error) { setNotice(error instanceof Error ? error.message : 'Could not connect wallet.') }
  }
  const handleMint = async () => {
    setMinting(true); setNotice('Confirm the mint transaction in your wallet…')
    try {
      const address = walletAddress ? walletAddress as `0x${string}` : await connectWallet() as `0x${string}`
      if (!walletAddress) setWalletAddress(address)
      await mintDemoTokens()
      const balance = await getDemoTokenBalance(address)
      try {
        await addDemoTokenToWallet()
        setNotice(`Successfully minted 1,000 dUSDC. Balance: ${Number(balance).toLocaleString()} ${tokenSymbol}. Token added to MetaMask.`)
      } catch (error) {
        const hint = error instanceof Error ? error.message : 'Add dUSDC manually in MetaMask.'
        setNotice(`Successfully minted 1,000 dUSDC. Balance: ${Number(balance).toLocaleString()} ${tokenSymbol}. ${hint} Contract: ${tokenAddress}`)
      }
    }
    catch (error) { setNotice(error instanceof Error ? error.message : 'Could not mint demo tokens.') }
    finally { setMinting(false) }
  }
  const handleAddToken = async () => {
    setAddingToken(true); setNotice('Confirm adding dUSDC to your wallet…')
    try {
      if (!walletAddress) setWalletAddress(await connectWallet())
      await addDemoTokenToWallet()
      setNotice(`${tokenSymbol} added to MetaMask. If you still do not see it, import manually with contract ${tokenAddress}.`)
    }
    catch (error) { setNotice(error instanceof Error ? error.message : `Could not add ${tokenSymbol} to your wallet. Import manually with contract ${tokenAddress}.`) }
    finally { setAddingToken(false) }
  }
  const handleCopyTokenAddress = async () => {
    if (!tokenAddress) return
    try {
      await navigator.clipboard.writeText(tokenAddress)
      setNotice(`Copied ${tokenSymbol} contract address. In MetaMask: Assets → Import tokens → paste address, symbol ${tokenSymbol}, decimals 6.`)
    } catch { setNotice(`Copy this ${tokenSymbol} contract address into MetaMask: ${tokenAddress}`) }
  }
  const handleCreate = async () => {
    setBusy(true); setNotice('Confirm the split-creation transaction in your wallet…')
    try { const result = await createPaymentLink(amount, allocations); setLinkId(result.linkId); setCreated(true); setNotice(`Live payment split #${result.linkId} created.`) }
    catch (error) { setNotice(error instanceof Error ? error.message : 'Could not create split.') }
    finally { setBusy(false) }
  }
  const handlePay = async () => {
    setBusy(true); setNotice('Approve the token, then confirm the payment in your wallet…')
    try { const hash = await payPaymentLink(linkId, amount); setTxHash(hash); setPaid(true); setNotice('Payment processed and distributed onchain.') }
    catch (error) { setNotice(error instanceof Error ? error.message : 'Could not process payment.') }
    finally { setBusy(false) }
  }
  const distributedAmount = (pct: number) => {
    const clean = Number(amount.replace(/,/g, '')) || 0
    return ((clean * pct) / 100).toLocaleString(undefined, { maximumFractionDigits: 2 })
  }
  const explorerUrl = txHash ? `https://testnet.monadexplorer.com/tx/${txHash}` : ''

  return <main>
    <nav><div className="brand"><div className="mark"><SplitSquareHorizontal size={18}/></div>WalletFlow</div><span className="network"><i/> Monad Testnet</span>{onchainReady && <button className="connect" disabled={addingToken || minting} onClick={handleCopyTokenAddress}><Copy size={15}/> Copy token address</button>}{onchainReady && <button className="connect" disabled={addingToken || minting} onClick={handleAddToken}>{addingToken ? 'Adding…' : 'Add dUSDC to wallet'}</button>}{onchainReady && <button className="connect" disabled={minting || addingToken} onClick={handleMint}>{minting ? 'Minting…' : 'Get 1,000 dUSDC'}</button>}<button className="connect" onClick={handleConnect}><Wallet size={16}/>{walletAddress ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}` : 'Connect wallet'}</button></nav>
    <section className="hero"><div><div className="eyebrow"><Sparkles size={14}/> ATOMIC PAYMENT SPLITTER</div><h1>Split one payment.<br/><em>Pay everyone instantly.</em></h1><p>Distribute one payment across multiple wallets in a single atomic transaction on Monad. Built for agencies, startups, and teams who pay more than one person at once.</p><div className="hero-trust"><ShieldCheck size={17}/> Atomic, onchain distribution. No backend required.</div></div><div className="flow-card"><span>ONE PAYMENT</span><strong>{amount} {tokenSymbol}</strong><div className="flow-line"/><span>SPLITS INSTANTLY</span><div className="mini-splits"><b>45%</b><b>20%</b><b>15%</b><b>20%</b></div></div></section>
    <section className="workspace"><div className="builder"><div className="section-heading"><div><span>01 / CREATE</span><h2>Set up your payment split</h2></div><div className={`status ${total === 100 ? '' : total > 100 ? 'over' : 'under'}`}>{total === 100 ? <><Check size={14}/> Ready</> : total > 100 ? <><AlertTriangle size={14}/> {total}% / 100%</> : `${total}% / 100%`}</div></div>{notice && <div className="notice">{notice}</div>}
      <label>What are you getting paid for?<input defaultValue="Website redesign — July milestone"/></label><div className="fields"><label>Amount<div className="input-with-suffix"><input value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ''))}/><b>{tokenSymbol}</b></div></label><label>Network<select defaultValue="monad"><option value="monad">Monad Testnet</option></select></label></div>
      <div className="allocation-title"><div><span>02 / ALLOCATE</span><h2>Where should this payment go?</h2></div><span className="hint">Must total 100%</span></div>
      <div className="allocations">{allocations.map((a, i) => <div className="allocation" key={i}><i style={{background:a.color}}/><input className="label-input" value={a.label} onChange={e => update(i, 'label', e.target.value)}/><input className="wallet-input" value={a.wallet} onChange={e => update(i, 'wallet', e.target.value)}/><div className="percentage"><input value={a.percentage} type="number" onChange={e => update(i, 'percentage', Number(e.target.value))}/><span>%</span></div></div>)}</div><button className="add" onClick={add}><Plus size={16}/> Add destination</button>
      {!created ? <button className="primary" disabled={total !== 100 || busy} onClick={handleCreate}>{busy ? 'Waiting for wallet…' : 'Create payment split'} <ArrowRight size={18}/></button> : <div className="created"><div><Check size={18}/><div><b>Payment split #{linkId} created</b><small>Ready to share with your client</small></div></div><button onClick={() => navigator.clipboard?.writeText(`${location.origin}?link=${linkId}`)}><Copy size={15}/> Copy split link</button></div>}
    </div>
    <aside><div className="preview-head"><span>LIVE PREVIEW</span><span className="dot">◉ Onchain</span></div><div className="invoice"><div className="invoice-brand"><div className="mark"><SplitSquareHorizontal size={16}/></div> WalletFlow</div><p>Website redesign — July milestone</p><h3>{amount} <small>{tokenSymbol}</small></h3><div className="split-list">{allocations.map((a, i) => <div key={i}><span style={{background:a.color}}/>{a.label}<b>{a.percentage}%</b>{paid && <em>+{distributedAmount(a.percentage)} {tokenSymbol}</em>}</div>)}</div><button disabled={!created || busy} onClick={handlePay}>{paid ? <><Check size={17}/> Payment successful</> : busy ? 'Waiting for wallet…' : <>Execute payment <ArrowRight size={17}/></>}</button>{paid && <div className="receipt-panel"><div className="receipt-row"><span>Amount distributed</span><b>{amount} {tokenSymbol}</b></div><div className="receipt-row"><span>Transaction hash</span><code>{txHash ? `${txHash.slice(0, 8)}…${txHash.slice(-6)}` : '—'}</code></div>{explorerUrl && <a className="receipt" href={explorerUrl} target="_blank" rel="noreferrer"><Check size={14}/> Distributed atomically · View on Monad Explorer <ExternalLink size={12}/></a>}</div>}</div><div className="receipt-note"><SplitSquareHorizontal size={16}/><span>Each payment split produces an immutable onchain receipt.</span></div></aside>
    </section>
  </main>
}
createRoot(document.getElementById('root')!).render(<App />)
