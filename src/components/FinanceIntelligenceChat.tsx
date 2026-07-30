import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, ChevronDown, Maximize2, Mic, Send, Sparkles, X } from 'lucide-react';
import type { ScreenId } from '../data/nav';

type Msg = { role: 'user' | 'assistant'; text: string; confidence?: number; sources?: string[] };

const prompts = [
  'What needs Charl’s attention today?',
  'Why are collections below target?',
  'How can TiAuto release cash in 14 days?',
  'Which finance agents should we activate first?',
];

function answerFor(query: string, active: ScreenId): Msg {
  const q = query.toLowerCase();
  const source = ['TiAuto May 2026 MBR', 'Finance Intelligence demo model'];

  if (q.includes('collection') || q.includes('dso') || q.includes('receivable') || q.includes('continental') || q.includes('absa')) {
    return {
      role: 'assistant',
      confidence: 92,
      sources: source,
      text: 'Collections closed at R63m against a R68m target, a R5m shortfall. The clearest pressure points are Continental’s R345k Easter Campaign balance and ABSA Fleet allocation delays caused by incomplete or ambiguous remittance information. Recommended action: run a 14-day collections mission focused on those accounts, clear allocation blockers daily and measure recovered cash rather than call volumes.',
    };
  }
  if (q.includes('cash') || q.includes('bank') || q.includes('liquidity') || q.includes('14 day')) {
    return {
      role: 'assistant',
      confidence: 89,
      sources: source,
      text: 'The immediate cash opportunity is concentrated in three levers: recover the R5m collections gap, reduce the R8.5m cash/card deposits not yet reflected as banked, and improve the speed of fleet-payment allocation. A controlled 14-day mission should assign owners by store/account, track daily movement and escalate items older than the agreed banking or allocation window.',
    };
  }
  if (q.includes('supplier') || q.includes('payment') || q.includes('ap') || q.includes('vendor')) {
    return {
      role: 'assistant',
      confidence: 87,
      sources: source,
      text: 'Accounts Payable processed 264 payments in May with 100% reported reconciliation coverage. The intelligence opportunity is not simply more automation—it is exception control: duplicate-payment detection, unusual supplier value movements, payment-term optimisation, bank-detail change risk and automated evidence packs before release. Phase 2 payment posting and upload automation should be prioritised because it carries the strongest identified effort-saving opportunity.',
    };
  }
  if (q.includes('agent') || q.includes('activate') || q.includes('automation')) {
    return {
      role: 'assistant',
      confidence: 94,
      sources: source,
      text: 'Activate three agents first: 1) Reconciliation Agent for bank-to-cashbook matching and confidence-scored exceptions; 2) Collections Agent for Continental, ABSA Fleet and ageing prioritisation; 3) Store Banking Agent for unbanked cash/card monitoring. These are the strongest first-wave use cases because they are measurable, data-accessible and directly linked to cash, control and manual effort.',
    };
  }
  if (q.includes('month') || q.includes('close') || q.includes('sla')) {
    return {
      role: 'assistant',
      confidence: 91,
      sources: source,
      text: 'May month-end was reported on time with no operational issues and critical SLAs were met. The risk is therefore not current failure; it is hidden dependency on manual tracking. The Month-End Agent should monitor outstanding journals, reconciliations, approvals, system-sync issues and audit evidence, then predict close risk before it becomes visible in the MBR.',
    };
  }
  if (q.includes('today') || q.includes('attention') || q.includes('risk') || q.includes('focus')) {
    return {
      role: 'assistant',
      confidence: 93,
      sources: source,
      text: 'Charl’s top priorities today should be: 1) close the R5m collections gap; 2) investigate and reduce the R8.5m unbanked cash/card exposure; 3) resolve the foreign-age-analysis system-sync failure; 4) force decisions on parked transformation items; and 5) convert the reconciliation proof of concept into a controlled production pilot with quantified value.',
    };
  }

  const pageText: Partial<Record<ScreenId, string>> = {
    'command-centre': 'You are viewing CFO Mission Control. I can explain the health score, risks, collections gap, unbanked exposure or recommended executive actions.',
    'working-capital': 'You are viewing Working Capital Intelligence. Ask me about DSO, ageing, collections, supplier timing or cash-release scenarios.',
    reconciliation: 'You are viewing Reconciliation Intelligence. Ask me how confidence matching, exception routing and human approval would work.',
    'mission-control': 'You are viewing Agent Mission Control. Ask which agents to activate, what each agent monitors or how human-in-the-loop control works.',
    treasury: 'You are viewing Cash Intelligence. Ask about store banking, cash visibility, bank charges or liquidity actions.',
  };
  return {
    role: 'assistant', confidence: 84, sources: source,
    text: pageText[active] ?? 'I can analyse TiAuto’s collections, DSO, AP payments, store banking, reconciliations, month-end, transformation pipeline and agent opportunities. Ask a direct CFO question and I will return the situation, evidence and recommended action.',
  };
}

export default function FinanceIntelligenceChat({ active, onOpenFull }: { active: ScreenId; onOpenFull: () => void }) {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', text: 'Good morning, Charl. I am monitoring cash, collections, AP, Cashbooks, reconciliations and month-end. What would you like to understand?', confidence: 96, sources: ['TiAuto May 2026 MBR'] },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const contextLabel = useMemo(() => active.replaceAll('-', ' '), [active]);

  const submit = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { role: 'user', text: clean }, answerFor(clean, active)]);
    setQuery('');
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 30);
  };

  return (
    <>
      {!open && (
        <motion.button
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          onClick={() => setOpen(true)}
          className="fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-full border border-cyan-300/30 bg-slate-950/90 px-4 py-3 text-white shadow-[0_0_35px_-8px_rgba(34,211,238,.75)] backdrop-blur-xl"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
            <Sparkles size={18} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </span>
          <span className="text-left"><span className="block text-sm font-semibold">Finance Intelligence</span><span className="block text-[10px] text-cyan-200/70">Ask Charl AI</span></span>
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 24, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .97 }}
            className={`fixed right-4 bottom-4 z-50 w-[min(430px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/95 text-white shadow-2xl backdrop-blur-2xl ${minimised ? 'h-auto' : 'h-[min(680px,calc(100vh-2rem))]'}`}
          >
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300"><Bot size={18} /></div>
                <div><div className="text-sm font-semibold">Finance Intelligence</div><div className="text-[10px] capitalize text-cyan-200/60">Context: {contextLabel}</div></div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={onOpenFull} title="Open full intelligence workspace" className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"><Maximize2 size={15} /></button>
                <button onClick={() => setMinimised(v => !v)} title="Minimise" className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"><ChevronDown size={16} className={minimised ? 'rotate-180' : ''} /></button>
                <button onClick={() => setOpen(false)} title="Close" className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"><X size={16} /></button>
              </div>
            </header>

            {!minimised && <>
              <div className="h-[calc(100%-142px)] overflow-y-auto px-4 py-4">
                <div className="mb-4 flex flex-wrap gap-2">
                  {prompts.map(p => <button key={p} onClick={() => submit(p)} className="rounded-full border border-cyan-300/15 bg-cyan-400/5 px-3 py-1.5 text-[10px] text-cyan-100/80 hover:bg-cyan-400/10">{p}</button>)}
                </div>
                <div className="space-y-4">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-[12.5px] leading-relaxed ${m.role === 'user' ? 'bg-cyan-400 text-slate-950' : 'border border-white/10 bg-white/[.055] text-slate-100'}`}>
                        {m.text}
                        {m.role === 'assistant' && m.confidence && <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-2 text-[9px] text-white/45"><span>Confidence {m.confidence}%</span><span>{m.sources?.join(' · ')}</span></div>}
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-slate-950/90 p-3">
                <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[.04] p-2 focus-within:border-cyan-300/35">
                  <button title="Voice input concept" className="rounded-lg p-2 text-white/45 hover:text-cyan-300"><Mic size={16} /></button>
                  <textarea value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(query); } }} rows={1} placeholder="Ask about cash, risk, DSO, suppliers..." className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-white/30" />
                  <button onClick={() => submit(query)} className="rounded-lg bg-cyan-400 p-2.5 text-slate-950 hover:bg-cyan-300"><Send size={15} /></button>
                </div>
              </div>
            </>}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
