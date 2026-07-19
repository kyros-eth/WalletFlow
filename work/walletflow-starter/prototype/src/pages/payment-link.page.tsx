import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutShell } from '@components/layout-shell';
import { AllocationMeter } from '@components/allocation-meter';
import { QrCode, Copy, Share2, SplitSquareHorizontal, CheckCircle2, Wallet, Monitor, ExternalLink, Hash } from 'lucide-react';
import { usePaymentLinkStore } from '../stores/payment-link.store';

const SPLIT_RECIPIENTS = [
  { label: 'Savings', percentage: 60, amount: 600 },
  { label: 'Bills', percentage: 30, amount: 300 },
  { label: 'Main', percentage: 10, amount: 100 },
];

const TOTAL_AMOUNT = SPLIT_RECIPIENTS.reduce((sum, r) => sum + r.amount, 0);
const TX_HASH = '0x8f2a4c1b7e9d0a3f5c6b8e1d2a4f7c9b0e3d5a8f1c4b7e0d2a5f8c1b4e7d0a3f';

export default function PaymentLinkPage() {
  const { step, copied, setStep, setCopied } = usePaymentLinkStore();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executePayment = () => {
    setStep('PAYING');
    setTimeout(() => setStep('EXECUTING'), 1500);
    setTimeout(() => setStep('SUCCESS'), 3500);
  };

  return (
    <LayoutShell activeTab="links">
      <div className="py-stack-sm flex flex-col gap-loose max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-loose">
          <div className="flex flex-col gap-comfortable">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center justify-center">
                 <SplitSquareHorizontal size={20} className="text-brand-primary" />
              </div>
              <h1 className="text-h1 font-bold text-white">Payment Split</h1>
            </div>
            <div className="glass-card p-section rounded-3xl border-white/5 flex flex-col items-center gap-comfortable text-center">
              <div className="p-comfortable bg-white rounded-2xl shadow-2xl">
                 <QrCode size={180} className="text-surface-base" />
              </div>
              <div className="w-full flex flex-col gap-snug">
                <span className="text-caption text-text-muted font-bold uppercase tracking-widest text-left">Shareable Split Link</span>
                <div className="flex items-center gap-2 p-2 bg-surface-base rounded-xl border border-white/10">
                  <span className="flex-1 text-caption text-text-secondary font-mono truncate px-2">walletflow.app/split/client-a-freelance-82k</span>
                  <button onClick={handleCopy} className="p-2 bg-brand-primary text-text-on-primary rounded-lg font-bold text-caption hover:bg-brand-primary/90 transition-all flex items-center gap-1.5">
                    {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col gap-snug text-left">
                <span className="text-caption text-text-muted font-bold uppercase tracking-widest">Recipients</span>
                <div className="grid grid-cols-3 gap-2">
                  {SPLIT_RECIPIENTS.map((r) => (
                    <div key={r.label} className="p-3 rounded-xl bg-surface-base border border-white/5 flex flex-col gap-1">
                      <span className="text-[10px] text-text-muted">{r.label}</span>
                      <span className="text-body font-bold text-white">{r.percentage}%</span>
                    </div>
                  ))}
                </div>
                <AllocationMeter total={SPLIT_RECIPIENTS.reduce((s, r) => s + r.percentage, 0)} compact />
              </div>
              <div className="grid grid-cols-2 gap-comfortable w-full">
                <button onClick={() => {}} className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-body font-bold text-white hover:bg-white/10 transition-all">
                  <Share2 size={20} /> Share
                </button>
                <button onClick={() => setStep('IDLE')} className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-body font-bold text-white hover:bg-white/10 transition-all">
                  <Monitor size={20} /> Preview
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-comfortable">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-h3 font-bold text-white">Live Payer Preview</h2>
                <span className="text-caption text-status-success font-bold flex items-center gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" /> Online
                </span>
             </div>
             <div className="glass-card rounded-[2.5rem] border-white/10 overflow-hidden flex flex-col min-h-[560px] relative">
                <div className="bg-surface-raised p-6 border-b border-white/5 flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-primary/20 border-2 border-brand-primary/50 p-1">
                     <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=128&h=128&fit=crop" alt="User" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div><h3 className="text-body font-bold text-white">Pay Freelance Income Split</h3><p className="text-caption text-text-muted">WalletFlow Payment Splitter</p></div>
                </div>
                <div className="flex-1 p-loose flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    {step === 'IDLE' && (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center gap-loose">
                         <div className="flex flex-col items-center">
                            <span className="text-caption text-text-muted uppercase font-bold mb-1">Amount to pay</span>
                            <span className="text-h1 font-bold text-white">{TOTAL_AMOUNT.toFixed(2)} <span className="text-h2">USDC</span></span>
                            <span className="text-caption text-text-secondary mt-1">Splits atomically across {SPLIT_RECIPIENTS.length} wallets</span>
                         </div>
                         <button onClick={executePayment} className="w-full py-5 rounded-2xl bg-brand-primary text-text-on-primary font-bold text-h3 hover:bg-brand-primary/90 transition-all monad-glow active:scale-95">Execute Payment</button>
                      </motion.div>
                    )}
                    {step === 'PAYING' && (
                      <motion.div key="paying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
                         <div className="w-20 h-20 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
                         <span className="text-body font-bold text-white">Confirming Transaction...</span>
                      </motion.div>
                    )}
                    {step === 'EXECUTING' && (
                       <motion.div key="executing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col gap-4">
                         <div className="flex items-center justify-center gap-3 mb-6"><SplitSquareHorizontal size={32} className="text-brand-primary animate-pulse" /><span className="text-h3 font-bold text-white">Split Executing</span></div>
                         <div className="space-y-4">
                            {['Payment Received', 'Allocation Validated', 'Distributing to Wallets...'].map((s, i) => (
                              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                <span className="text-caption font-bold text-white">{s}</span>
                                <CheckCircle2 size={16} className={i < 2 ? "text-status-success" : "text-brand-primary animate-pulse"} />
                              </div>
                            ))}
                         </div>
                       </motion.div>
                    )}
                    {step === 'SUCCESS' && (
                       <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center gap-comfortable w-full">
                         <div className="w-24 h-24 rounded-full bg-status-success/10 border-2 border-status-success/30 flex items-center justify-center mb-2 monad-glow"><CheckCircle2 size={48} className="text-status-success" /></div>
                         <h3 className="text-h2 font-bold text-white mb-1">Payment Successful</h3>
                         <div className="flex items-baseline gap-2">
                            <span className="text-caption text-text-muted uppercase font-bold">Amount Distributed</span>
                            <span className="text-body font-mono font-bold text-brand-accent">{TOTAL_AMOUNT.toFixed(2)} USDC</span>
                         </div>

                         <div className="w-full flex flex-col gap-2 mt-2 text-left">
                            <span className="text-caption text-text-muted font-bold uppercase tracking-widest">Recipient Breakdown</span>
                            {SPLIT_RECIPIENTS.map((r) => (
                              <div key={r.label} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Wallet size={14} className="text-text-muted" />
                                  <span className="text-caption text-white font-medium">{r.label}</span>
                                  <span className="text-[10px] text-text-muted">({r.percentage}%)</span>
                                </div>
                                <span className="text-caption font-mono font-bold text-status-success">+{r.amount} USDC</span>
                              </div>
                            ))}
                         </div>

                         <div className="w-full p-3 rounded-xl bg-surface-base border border-white/5 flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Hash size={14} className="text-text-muted flex-shrink-0" />
                              <span className="text-caption font-mono text-text-secondary truncate">{TX_HASH}</span>
                            </div>
                         </div>

                         <button onClick={() => {}} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-caption font-bold text-brand-accent transition-all">
                            View on Monad Explorer <ExternalLink size={14} />
                         </button>

                         <button onClick={() => setStep('IDLE')} className="mt-2 text-caption font-bold text-text-secondary hover:text-white transition-colors">Split Another Payment</button>
                       </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             </div>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}
