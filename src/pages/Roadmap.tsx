import { motion } from 'framer-motion';
import { Target, Database, UserCheck, PackageCheck, Map } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { pilotOptions, proofTimeline } from '../data/domainData';
import CursorSpotlight from '../components/CursorSpotlight';

export default function Roadmap() {
  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1200px] mx-auto relative">
      <CursorSpotlight />
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 text-[var(--efi-accent-cyan)]/80 text-[12px] font-mono mb-3">
          <Map size={13} /> The Ask
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-medium text-[var(--efi-ink-0)] max-w-3xl mx-auto leading-snug">
          We are not asking for an enterprise rollout.
        </h1>
        <p className="text-[var(--efi-ink-1)] text-[15px] mt-4 max-w-xl mx-auto">
          We are asking to validate one finance outcome through a controlled proof of value.
        </p>
      </div>

      <div className="mt-12">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-ink-2)] mb-4 font-medium text-center">Recommended First Pilots</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pilotOptions.map((p, i) => (
            <GlassCard key={p.id} strong delay={i * 0.08} className="p-6">
              <div className="font-display text-[16px] text-[var(--efi-ink-0)] font-medium mb-3">{p.name}</div>

              <div className="flex items-start gap-2.5 mb-3">
                <Target size={14} className="text-[var(--efi-accent-cyan)] mt-0.5 shrink-0" />
                <p className="text-[13px] text-[var(--efi-ink-1)] leading-relaxed">{p.whyItMatters}</p>
              </div>

              <div className="flex items-start gap-2.5 mb-3">
                <Database size={14} className="text-[var(--efi-accent-blue)] mt-0.5 shrink-0" />
                <p className="text-[13px] text-[var(--efi-ink-1)] leading-relaxed">
                  <span className="text-[var(--efi-ink-1)]">Data needed: </span>{p.dataNeeded.join(', ')}
                </p>
              </div>

              <div className="flex items-start gap-2.5 mb-3">
                <UserCheck size={14} className="text-[var(--efi-accent-violet)] mt-0.5 shrink-0" />
                <p className="text-[13px] text-[var(--efi-ink-1)] leading-relaxed">
                  <span className="text-[var(--efi-ink-1)]">Business owner needed: </span>{p.businessOwner}
                </p>
              </div>

              <div className="flex items-start gap-2.5 pt-3 mt-1 border-t border-[var(--efi-border)]">
                <PackageCheck size={14} className="text-[var(--efi-accent-emerald)] mt-0.5 shrink-0" />
                <p className="text-[13px] text-[var(--efi-ink-0)] leading-relaxed">{p.expectedOutput}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-ink-2)] mb-6 font-medium text-center">Proof of Value Timeline</div>
        <div className="relative">
          <div className="hidden md:block absolute top-[18px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {proofTimeline.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.5, type: 'spring' }}
                  className="w-4 h-4 rounded-full mb-4 relative z-10"
                  style={{ background: 'var(--efi-cyan)', boxShadow: '0 0 16px 3px rgba(52,216,255,0.5)' }}
                />
                <div className="font-mono text-[10.5px] text-[var(--efi-accent-cyan)]/80 mb-1.5">{s.range}</div>
                <div className="font-display text-[14px] text-[var(--efi-ink-0)] font-medium mb-2">{s.title}</div>
                <p className="text-[12px] text-[var(--efi-ink-1)] leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
