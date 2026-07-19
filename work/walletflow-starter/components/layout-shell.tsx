import React, { useEffect } from 'react';
import { LayoutGrid, SplitSquareHorizontal, Send, Wallet, History, Settings, Bell, ChevronRight, Search, Activity, ArrowUpRight } from 'lucide-react';

interface LayoutShellProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'flows' | 'links' | 'wallets' | 'history' | 'settings';
}

export function LayoutShell({ children, activeTab }: LayoutShellProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, target: 'dashboard' },
    { id: 'flows', label: 'Payment Splits', icon: SplitSquareHorizontal, target: 'flows' },
    { id: 'links', label: 'Execute Payment', icon: Send, target: 'payment-link' },
    { id: 'wallets', label: 'Wallets', icon: Wallet, target: 'wallets' },
    { id: 'history', label: 'History', icon: History, target: 'history' },
    { id: 'settings', label: 'Settings', icon: Settings, target: 'settings' },
  ] as const;

  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 w-full px-6 py-4 flex justify-center">
        <nav className="glass-card px-comfortable py-2 rounded-2xl flex items-center justify-between w-full max-w-7xl border-white/5">
          <div className="flex items-center gap-8">
            <div 
              onClick={() => window.App.transitionTo('index')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center monad-glow transition-transform group-hover:scale-105">
                <Zap size={18} className="text-text-on-primary fill-text-on-primary" />
              </div>
              <span className="text-body font-bold text-white tracking-tight">WalletFlow</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => window.App.transitionTo(item.target)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-caption font-medium transition-all ${
                    activeTab === item.id 
                    ? 'text-white bg-white/10' 
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-raised border border-white/5">
              <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-caption text-text-secondary font-medium">Monad Testnet</span>
            </div>
            
            <button className="p-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
              <Bell size={20} />
            </button>

            <div className="h-8 w-px bg-white/10" />

            <button className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-xl bg-surface-raised border border-white/10 hover:border-white/20 transition-all">
              <span className="text-caption font-mono text-text-secondary">0x1234...abcd</span>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent p-0.5">
                <div className="w-full h-full rounded-[6px] bg-surface-raised overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pb-loose">
        {children}
      </main>
    </div>
  );
}
