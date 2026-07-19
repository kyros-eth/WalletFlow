import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutShell } from '@components/layout-shell';
import { FlowBlock } from '@components/flow-block';
import { AllocationMeter } from '@components/allocation-meter';
import { useFlowsNewStore } from '../stores/flows-new.store';
import { useFlowsStore } from '../stores/flows.store';
import { Zap, Shield, Wallet, ArrowRight, CheckCircle2, Coins, User, ChevronRight, ChevronLeft, DollarSign, Plus, SplitSquareHorizontal } from 'lucide-react';

export default function CreateFlowPage() {
  const { step, name, sender, token, amountCondition, setStep, setName, setSender, setToken, setAmountCondition, reset } = useFlowsNewStore();
  const { flows, hasSeeded, init: initFlows } = useFlowsStore();

  useEffect(() => {
    initFlows();
  }, [initFlows]);

  const handleCreate = () => {
    // In a real app we'd add to store, here we just transition
    reset();
    window.App.transitionTo('flows');
  };

  const steps = [
    { id: 1, label: 'Split Name' },
    { id: 2, label: 'Sender' },
    { id: 3, label: 'Token' },
    { id: 4, label: 'Condition' },
    { id: 5, label: 'Allocate Wallets' },
  ];

  return (
    <LayoutShell activeTab="flows">
      <div className="py-stack-sm flex flex-col gap-loose max-w-4xl mx-auto">
        <div className="flex items-center justify-between px-6 pt-loose">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-caption font-bold transition-all duration-500 ${step >= s.id ? 'bg-brand-primary border-brand-primary text-text-on-primary monad-glow' : 'bg-surface-raised border-white/10 text-text-muted'}`}>
                  {step > s.id ? <CheckCircle2 size={16} /> : s.id}
                </div>
                <span className={`text-caption font-medium transition-colors ${step >= s.id ? 'text-white' : 'text-text-muted'}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-white/5 mx-4 -mt-6">
                  <motion.div initial={{ width: '0%' }} animate={{ width: step > s.id ? '100%' : '0%' }} className="h-full bg-brand-primary" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="glass-card p-section rounded-[2rem] border-white/5 min-h-[500px] flex flex-col justify-between overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
              {step === 1 && (
                <div className="flex flex-col gap-comfortable">
                  <h2 className="text-h2 font-bold text-white">Name this payment split</h2>
                  <div className="flex flex-col gap-snug">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Freelance Income" className="bg-surface-base border border-white/10 rounded-xl px-comfortable py-4 text-body text-white focus:outline-none focus:border-brand-primary transition-all" />
                    <div className="flex flex-wrap gap-2">
                      {['Freelance Income', 'Employer Payroll', 'NFT Sales', 'Trading Profits'].map(chip => (
                        <button key={chip} onClick={() => setName(chip)} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-caption text-text-secondary hover:text-white hover:bg-white/10 transition-all">{chip}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="flex flex-col gap-comfortable">
                  <h2 className="text-h2 font-bold text-white">Who is sending the payment?</h2>
                  <div className="grid grid-cols-2 gap-comfortable">
                    {['Employer', 'Client', 'Marketplace', 'Exchange'].map(item => (
                      <button key={item} onClick={() => setSender(item)} className={`p-comfortable rounded-2xl border flex items-center gap-comfortable transition-all ${sender === item ? 'bg-brand-primary/10 border-brand-primary/40' : 'bg-white/5 border-white/5 hover:border-white/10'}`}>
                        <div className="w-12 h-12 rounded-xl bg-surface-raised border border-white/10 flex items-center justify-center"><User size={24} className="text-brand-accent" /></div>
                        <span className="text-body font-bold text-white">{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="flex flex-col gap-comfortable">
                  <h2 className="text-h2 font-bold text-white">Which token are you accepting?</h2>
                  <div className="grid grid-cols-3 gap-comfortable">
                    {['USDC', 'MON', 'ETH'].map(t => (
                      <button key={t} onClick={() => setToken(t)} className={`p-comfortable flex flex-col items-center gap-comfortable rounded-2xl border transition-all ${token === t ? 'bg-brand-primary/10 border-brand-primary/40' : 'bg-white/5 border-white/5 hover:border-white/10'}`}>
                        <div className="w-16 h-16 rounded-full bg-surface-raised border border-white/10 flex items-center justify-center"><Coins size={32} className="text-brand-highlight" /></div>
                        <span className="text-h3 font-bold text-white">{t}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="flex flex-col gap-comfortable">
                  <h2 className="text-h2 font-bold text-white">Any amount conditions?</h2>
                  <div className="grid grid-cols-2 gap-comfortable">
                    {['Any Amount', 'Greater Than', 'Less Than', 'Exact Amount'].map(cond => (
                      <button key={cond} onClick={() => setAmountCondition(cond)} className={`p-comfortable rounded-2xl border flex items-center justify-between transition-all ${amountCondition === cond ? 'bg-brand-primary/10 border-brand-primary/40' : 'bg-white/5 border-white/5 hover:border-white/10'}`}>
                        <span className="text-body font-bold text-white">{cond}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${amountCondition === cond ? 'border-brand-primary' : 'border-white/10'}`}>
                           {amountCondition === cond && <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 5 && (
                <div className="flex flex-col gap-comfortable overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                  <h2 className="text-h2 font-bold text-white">Allocate the split</h2>
                  <div className="flex flex-col gap-loose relative">
                    <div className="absolute left-14 top-16 bottom-16 w-1 bg-gradient-to-b from-brand-primary via-brand-accent to-status-success opacity-20" />
                    <FlowBlock type="WHEN" title="Trigger" content="Payment Received" icon={Zap} />
                    <FlowBlock type="AND" title="Condition" content={`Sender = ${sender || 'Any'}`} icon={Shield} color="brand-accent" />
                    <FlowBlock type="AND" title="Token" content={`Token = ${token}`} icon={Coins} color="brand-accent" />
                    <FlowBlock type="THEN" title="Action" content="Execute Payment Split" icon={SplitSquareHorizontal} color="status-success" isActive={false} />
                    <div className="ml-16 flex flex-col gap-comfortable">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-3 rounded-xl bg-brand-primary/5 border border-brand-primary/20 flex flex-col"><span className="text-[10px] text-brand-primary font-black">Savings</span><span className="text-body font-bold text-white">60%</span></div>
                        <div className="p-3 rounded-xl bg-brand-accent/5 border border-brand-accent/20 flex flex-col"><span className="text-[10px] text-brand-accent font-black">Bills</span><span className="text-body font-bold text-white">30%</span></div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/20 flex flex-col"><span className="text-[10px] text-white font-black">Main</span><span className="text-body font-bold text-white">10%</span></div>
                      </div>
                      <AllocationMeter total={60 + 30 + 10} />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between mt-loose pt-comfortable border-t border-white/5">
            <button onClick={() => step > 1 ? setStep(step - 1) : window.App.transitionTo('flows')} className="flex items-center gap-2 px-comfortable py-3 rounded-xl font-bold text-text-secondary hover:text-white transition-all">
              <ChevronLeft size={20} /> {step === 1 ? 'Cancel' : 'Previous'}
            </button>
            <button onClick={() => step < 5 ? setStep(step + 1) : handleCreate()} className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-text-on-primary px-loose py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-brand-primary/20">
              {step === 5 ? 'Create Split' : 'Next Step'} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}
