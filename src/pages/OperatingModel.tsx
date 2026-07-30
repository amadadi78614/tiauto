import { motion } from 'framer-motion';
import { Users, MessageSquare, Sparkles, Database, Server, UsersRound, ShieldCheck } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { operatingLayers } from '../data/domainData';
import CursorSpotlight from '../components/CursorSpotlight';

const icons: Record<string, typeof Users> = {
  users: Users,
  'message-square': MessageSquare,
  sparkles: Sparkles,
  'users-round': UsersRound,
  database: Database,
  server: Server,
  'shield-check': ShieldCheck,
};

export default function OperatingModel() {
  return (
    <div className="px-6 lg:px-10 py-10 max-w-[900px] mx-auto relative">
      <CursorSpotlight />
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-[var(--efi-accent-cyan)]/80 text-[12px] font-mono mb-3">Operating Model</div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-[var(--efi-ink-0)]">Embedded where finance already works</h1>
        <p className="text-[11.5px] text-[var(--efi-ink-2)] mt-3 max-w-md mx-auto">
          Target-state integration architecture — illustrative, pending IT and security review.
        </p>
      </div>

      <div className="space-y-3">
        {operatingLayers.map((l, i) => {
          const Icon = icons[l.icon];
          const isGovernance = l.title === 'Governance';
          return (
            <div key={l.title} className="flex flex-col items-center">
              <GlassCard delay={i * 0.08} strong={isGovernance} className={`p-5 w-full flex items-center gap-4 ${isGovernance ? 'border-emerald-400/30' : ''}`}>
                <div className={`w-11 h-11 rounded-xl efi-glass-strong flex items-center justify-center shrink-0 ${isGovernance ? 'text-[var(--efi-accent-emerald)]' : 'text-[var(--efi-accent-cyan)]'}`}>
                  <Icon size={19} />
                </div>
                <div>
                  <div className="text-[14.5px] text-[var(--efi-ink-0)] font-medium font-display">{l.title}</div>
                  <div className="text-[12px] text-[var(--efi-ink-2)] mt-0.5">{l.items.join(' · ')}</div>
                </div>
              </GlassCard>
              {i < operatingLayers.length - 1 && (
                <motion.div initial={{ height: 0 }} animate={{ height: 28 }} transition={{ delay: i * 0.08 + 0.3 }} className="w-[2px] bg-gradient-to-b from-cyan-400/40 to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
