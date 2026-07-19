import React from 'react';
import { LayoutShell } from '@components/layout-shell';
import { useSettingsStore } from '../stores/settings.store';
import { 
  Wallet, 
  Zap, 
  Bell, 
  Moon, 
  ChevronRight, 
  CheckCircle2
} from 'lucide-react';

export default function SettingsPage() {
  const { 
    isExecutionEnabled, 
    gasStrategy, 
    notifications, 
    themeMode, 
    textureOverlay,
    setExecutionEnabled,
    setGasStrategy,
    setNotification,
    setThemeMode,
    setTextureOverlay
  } = useSettingsStore();

  const sections = [
    {
      title: 'Connected Wallet',
      icon: Wallet,
      items: [
        { label: 'Main Wallet', value: '0x1234...abcd', type: 'text' },
        { label: 'Network', value: 'Monad Testnet', type: 'pill' },
      ],
      actions: [{ label: 'Disconnect', variant: 'danger' }]
    },
    {
      title: 'Automations',
      icon: Zap,
      items: [
        { label: 'Monad Execution', value: isExecutionEnabled, type: 'toggle', onChange: () => setExecutionEnabled(!isExecutionEnabled) },
        { label: 'Gas Strategy', value: gasStrategy, type: 'select' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Payment Received', value: notifications.paymentReceived, type: 'checkbox', onChange: () => setNotification('paymentReceived', !notifications.paymentReceived) },
        { label: 'Flow Executed', value: notifications.flowExecuted, type: 'checkbox', onChange: () => setNotification('flowExecuted', !notifications.flowExecuted) },
        { label: 'Execution Failed', value: notifications.executionFailed, type: 'checkbox', onChange: () => setNotification('executionFailed', !notifications.executionFailed) },
      ]
    },
    {
      title: 'Appearance',
      icon: Moon,
      items: [
        { label: 'Theme Mode', value: themeMode, type: 'select' },
        { label: 'Texture Overlay', value: textureOverlay, type: 'toggle', onChange: () => setTextureOverlay(!textureOverlay) },
      ]
    }
  ];

  return (
    <LayoutShell activeTab="settings">
      <div className="py-stack-sm flex flex-col gap-loose max-w-4xl mx-auto">
        <div>
          <h1 className="text-h1 font-bold text-white mb-1">Settings</h1>
          <p className="text-body text-text-secondary">Configure your platform experience and automation rules.</p>
        </div>

        <div className="flex flex-col gap-comfortable">
          {sections.map((section, i) => (
            <div key={i} className="glass-card rounded-3xl border-white/5 overflow-hidden">
              <div className="px-loose py-comfortable bg-white/[0.02] border-b border-white/5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-surface-raised border border-white/10 text-brand-primary"><section.icon size={20} /></div>
                <h3 className="text-body font-bold text-white">{section.title}</h3>
              </div>
              <div className="p-loose flex flex-col gap-comfortable">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-body font-medium text-white">{item.label}</span>
                       <span className="text-caption text-text-muted">Configure your preferences.</span>
                    </div>
                    <div className="flex items-center gap-4">
                       {item.type === 'text' && <span className="text-caption font-mono text-text-secondary">{item.value as string}</span>}
                       {item.type === 'pill' && <span className="px-2 py-1 rounded-md bg-brand-primary/10 border border-brand-primary/20 text-[10px] font-black text-brand-primary uppercase">{item.value as string}</span>}
                       {item.type === 'toggle' && (
                         <div onClick={item.onChange} className={`w-12 h-6 rounded-full p-1 transition-colors relative cursor-pointer ${item.value ? 'bg-brand-primary' : 'bg-white/10'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-all shadow-sm ${item.value ? 'translate-x-6' : 'translate-x-0'}`} />
                         </div>
                       )}
                       {item.type === 'checkbox' && (
                         <div onClick={item.onChange} className={`w-6 h-6 rounded-md border cursor-pointer flex items-center justify-center transition-all ${item.value ? 'bg-brand-primary border-brand-primary' : 'bg-white/5 border-white/10'}`}>
                           {item.value && <CheckCircle2 size={14} className="text-text-on-primary" />}
                         </div>
                       )}
                       {item.type === 'select' && (
                         <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-base border border-white/10 text-caption text-white cursor-pointer hover:border-white/20">
                            {item.value as string}
                            <ChevronRight size={14} className="rotate-90" />
                         </div>
                       )}
                    </div>
                  </div>
                ))}
                {section.actions && (
                  <div className="mt-comfortable pt-comfortable border-t border-white/5 flex gap-2">
                    {section.actions.map((action, idx) => (
                      <button key={idx} className={`px-comfortable py-2 rounded-xl text-caption font-bold transition-all ${action.variant === 'danger' ? 'bg-status-error/10 text-status-error border border-status-error/20 hover:bg-status-error/20' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>{action.label}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutShell>
  );
}
