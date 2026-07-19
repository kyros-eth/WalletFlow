import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, SplitSquareHorizontal, Play, ChevronRight, Building2, Users2, Rocket } from 'lucide-react';
import { useIndexStore } from '../stores/index.store';

export default function LandingPage() {
  const { init } = useIndexStore();

  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="min-h-screen selection:bg-brand-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
        <div className="glass-card px-comfortable py-3 rounded-full flex items-center justify-between w-full max-w-5xl border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center monad-glow">
              <Zap size={18} className="text-text-on-primary fill-text-on-primary" />
            </div>
            <span className="text-body font-bold text-white tracking-tight">WalletFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => window.App.transitionTo('index')} className="text-caption text-text-secondary hover:text-white transition-colors">How It Works</button>
            <button onClick={() => window.App.transitionTo('index')} className="text-caption text-text-secondary hover:text-white transition-colors">Pricing</button>
            <button onClick={() => window.App.transitionTo('index')} className="text-caption text-text-secondary hover:text-white transition-colors">Docs</button>
          </div>
          <button 
            onClick={() => window.App.transitionTo('dashboard')}
            className="bg-brand-primary hover:bg-brand-primary/90 text-text-on-primary text-caption font-bold px-comfortable py-2 rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-brand-primary/20"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-macro pb-section px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-caption font-medium mb-comfortable">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            Now live on Monad Testnet
          </div>
          <h1 className="text-display font-bold text-gradient leading-tight mb-comfortable">
            Split One Payment. <br /> Pay Everyone Instantly.
          </h1>
          <p className="text-body-lg text-text-secondary mb-stack-lg max-w-2xl mx-auto">
            Distribute one payment across multiple wallets in a single atomic transaction on Monad. Built for agencies, startups, and teams who pay more than one person at once.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.App.transitionTo('flows-new')}
              className="group flex items-center gap-2 bg-text-primary text-surface-base px-loose py-4 rounded-xl font-bold text-body hover:bg-white transition-all active:scale-95"
            >
              Create a Payment Split
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => window.App.transitionTo('index')}
              className="flex items-center gap-2 px-loose py-4 rounded-xl font-bold text-body text-white hover:bg-white/5 transition-all border border-white/10"
            >
              <Play size={18} fill="currentColor" />
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Hero Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-section w-full max-w-5xl aspect-[21/9] glass-card rounded-[2rem] overflow-hidden relative border-white/5"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-accent/10 pointer-events-none" />
          <img 
            src="https://images.unsplash.com/photo-1644088379091-d574269d422f?ixid=M3w4NjY5NDB8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG5ldHdvcmslMjBjb25uZWN0aW9uJTIwbGluZXMlMjBkYXJrJTIwbWluaW1hbHxlbnwxfHx8fDE3ODQxNDIzMDZ8MA&ixlib=rb-4.1.0&w=1200&q=80" 
            alt="Payment Split Visualization"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-12 p-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-surface-raised border border-white/10 flex items-center justify-center shadow-xl">
                <Shield className="text-brand-accent" size={32} />
              </div>
              <span className="text-caption text-text-muted">One Payment</span>
            </div>
            
            <div className="flex-1 h-px bg-gradient-to-r from-brand-accent to-brand-primary relative">
              <motion.div 
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-8 h-px bg-white shadow-[0_0_10px_white]"
              />
            </div>

            <div className="w-24 h-24 rounded-3xl bg-brand-primary/20 border-2 border-brand-primary/50 flex items-center justify-center shadow-2xl monad-glow relative">
               <Zap className="text-brand-primary fill-brand-primary" size={48} />
            </div>

            <div className="flex-1 h-px bg-gradient-to-r from-brand-primary to-brand-accent relative">
               <motion.div 
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute top-1/2 -translate-y-1/2 w-8 h-px bg-white shadow-[0_0_10px_white]"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 glass-card p-3 rounded-xl border-white/10">
                <div className="w-8 h-8 bg-brand-accent/20 rounded-lg flex items-center justify-center"><ArrowRight size={16} className="text-brand-accent" /></div>
                <span className="text-caption text-white font-medium">Savings Wallet (60%)</span>
              </div>
              <div className="flex items-center gap-3 glass-card p-3 rounded-xl border-white/10">
                <div className="w-8 h-8 bg-status-telemetry/20 rounded-lg flex items-center justify-center"><ArrowRight size={16} className="text-status-telemetry" /></div>
                <span className="text-caption text-white font-medium">Bills Wallet (30%)</span>
              </div>
              <div className="flex items-center gap-3 glass-card p-3 rounded-xl border-white/10">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center"><ArrowRight size={16} className="text-text-secondary" /></div>
                <span className="text-caption text-white font-medium">Main Wallet (10%)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-section px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-comfortable">
          {[
            {
              title: "Atomic Splits",
              desc: "One incoming payment, many outgoing wallets — settled in a single onchain transaction. No partial fills, no missed transfers.",
              icon: SplitSquareHorizontal,
              color: "text-brand-primary"
            },
            {
              title: "Built for Teams",
              desc: "Route client payments straight to contributors, vendors, and reserves without a spreadsheet or a manual transfer queue.",
              icon: Users2,
              color: "text-brand-accent"
            },
            {
              title: "Trustless Execution",
              desc: "Every split runs through a smart contract on Monad — funds only move if the full allocation checks out.",
              icon: Shield,
              color: "text-status-success"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass-card p-loose rounded-[1.5rem] border-white/5 hover:border-white/10 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-surface-raised border border-white/10 flex items-center justify-center mb-comfortable ${item.color}`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-h3 font-bold text-white mb-tight">{item.title}</h3>
              <p className="text-body text-text-secondary leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-loose px-6 max-w-5xl mx-auto">
        <div className="glass-card rounded-[2rem] border-white/5 p-loose flex flex-col md:flex-row items-center justify-between gap-comfortable text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-surface-raised border border-white/10 flex items-center justify-center text-brand-primary flex-shrink-0">
              <Building2 size={22} />
            </div>
            <p className="text-body text-text-secondary max-w-md">
              Built for creator agencies, marketing agencies, startups, businesses, DAOs, and teams who split payouts every cycle.
            </p>
          </div>
          <button 
            onClick={() => window.App.transitionTo('flows-new')}
            className="flex-shrink-0 flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-comfortable py-3 rounded-xl font-bold text-caption transition-all active:scale-95"
          >
            <Rocket size={16} /> Start Splitting
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-loose px-6 border-t border-white/5 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 opacity-50">
          <Zap size={16} className="text-brand-primary" />
          <span className="text-caption text-text-muted">Built for Monad ecosystem. © 2026 WalletFlow.</span>
        </div>
      </footer>
    </div>
  );
}
