import { useMemo, useState, useCallback } from 'react';
import ReactFlow, { Background, BackgroundVariant, Controls, type Edge, type Node, type NodeMouseHandler } from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, User, ShieldCheck, Clock, Bot, Gavel } from 'lucide-react';
import CursorSpotlight from '../components/CursorSpotlight';
import MagneticButton from '../components/MagneticButton';

interface NodeDef {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: 'system' | 'concept' | 'rule';
  detail: string;
  dataOwner: string;
  governance: 'Approved' | 'Under review';
  freshness: string;
  agentsUsing: string[];
  decisionsSupported: string[];
}

const nodeDefs: NodeDef[] = [
  { id: 'sap', label: 'Sage', x: 0, y: 0, kind: 'system', detail: 'Core ERP source for the general ledger, AR, AP, cashbook and payment postings referenced across every finance domain.', dataOwner: 'TiAuto Finance Systems', governance: 'Approved', freshness: 'Illustrative — target daily refresh', agentsUsing: ['Working Capital Specialist', 'Financial Close Specialist', 'Payment Automation Specialist'], decisionsSupported: ['Working capital pilot scope', 'Close variance review'] },
  { id: 'powerbi', label: 'Power BI', x: 260, y: -80, kind: 'system', detail: 'Reporting layer surfacing consolidated dashboards and the executive reporting packs consumed by Board Reporting.', dataOwner: 'TiAuto Finance Reporting', governance: 'Approved', freshness: 'Illustrative — target weekly refresh', agentsUsing: ['Board Reporting Specialist', 'Working Capital Specialist'], decisionsSupported: ['Board narrative draft'] },
  { id: 'policies', label: 'Policies', x: -280, y: -60, kind: 'rule', detail: 'Banking, credit and payment-control policies that constrain collections, cashbook and payment recommendations.', dataOwner: 'Cashbooks & Banking', governance: 'Approved', freshness: 'Reviewed annually', agentsUsing: ['Cashbooks & Banking Specialist', 'Payment Automation Specialist'], decisionsSupported: ['Store banking exposure review'] },
  { id: 'tb', label: 'Trial Balance', x: -180, y: 140, kind: 'concept', detail: 'The close-cycle trial balance extract used to validate postings before lock.', dataOwner: 'TiAuto Finance Management', governance: 'Approved', freshness: 'Illustrative — per close cycle', agentsUsing: ['Financial Close Specialist'], decisionsSupported: ['Close variance review'] },
  { id: 'cashflow', label: 'Cash Flow', x: 60, y: 200, kind: 'concept', detail: 'Consolidated cash position feeding the Working Capital and cashbook visibility views.', dataOwner: 'Cashbooks & Banking', governance: 'Approved', freshness: 'Illustrative — target daily refresh', agentsUsing: ['Cashbooks & Banking Specialist', 'Working Capital Specialist'], decisionsSupported: ['Working capital pilot scope', 'Liquidity forecast review'] },
  { id: 'ar', label: 'Accounts Receivable', x: 320, y: 100, kind: 'concept', detail: 'Customer receivables and ageing, the primary driver behind Working Capital pressure.', dataOwner: 'Accounts Receivable', governance: 'Under review', freshness: 'Illustrative — target daily refresh', agentsUsing: ['Working Capital Specialist', 'Reconciliation Specialist'], decisionsSupported: ['Collections escalation'] },
  { id: 'ap', label: 'Accounts Payable', x: 340, y: 260, kind: 'concept', detail: 'Supplier payables and payment timing, cross-referenced with Procurement spend data.', dataOwner: 'Accounts Payable', governance: 'Approved', freshness: 'Illustrative — target daily refresh', agentsUsing: ['Working Capital Specialist', 'Reconciliation Specialist'], decisionsSupported: ['Payment timing review'] },
  { id: 'cashbooks', label: 'Cashbooks & Banking', x: -60, y: -220, kind: 'concept', detail: 'Bank balances, store deposits and cashbook allocations monitored against control rules.', dataOwner: 'Cashbooks & Banking', governance: 'Approved', freshness: 'Illustrative — target daily refresh', agentsUsing: ['Cashbooks & Banking Specialist', 'Cash & Liquidity Specialist'], decisionsSupported: ['Store banking exposure review'] },
  { id: 'capital', label: 'Payments & Automation', x: 220, y: -220, kind: 'concept', detail: 'Payment files, processing controls and automation dependencies across Accounts Payable.', dataOwner: 'Accounts Payable', governance: 'Under review', freshness: 'Illustrative — target daily refresh', agentsUsing: ['Payment Automation Specialist'], decisionsSupported: ['Automation production readiness'] },
  { id: 'projects', label: 'Projects', x: 460, y: -140, kind: 'concept', detail: 'Individual capital projects tracked for spend pacing against plan.', dataOwner: 'Capital Accounting', governance: 'Approved', freshness: 'Illustrative — monthly refresh', agentsUsing: ['Capital Specialist'], decisionsSupported: ['Depreciation timing review'] },
  { id: 'rules', label: 'Business Rules', x: -320, y: 100, kind: 'rule', detail: 'Threshold and escalation rules — variance tolerances, ageing thresholds, exception severity.', dataOwner: 'TiAuto Finance Management', governance: 'Approved', freshness: 'Reviewed quarterly', agentsUsing: ['Working Capital Specialist', 'Reconciliation Specialist', 'Financial Close Specialist'], decisionsSupported: ['Exception escalation thresholds'] },
  { id: 'reports', label: 'Reports', x: 100, y: -350, kind: 'concept', detail: 'Generated executive briefings and board narratives drawing on every connected domain.', dataOwner: 'TiAuto Finance Reporting', governance: 'Under review', freshness: 'Generated on demand', agentsUsing: ['Board Reporting Specialist'], decisionsSupported: ['Board narrative draft'] },
];

const edgeDefs: [string, string][] = [
  ['sap', 'tb'], ['sap', 'ar'], ['sap', 'ap'], ['sap', 'cashbooks'], ['sap', 'capital'],
  ['powerbi', 'reports'], ['powerbi', 'cashflow'], ['powerbi', 'ar'],
  ['policies', 'rules'], ['policies', 'cashbooks'],
  ['tb', 'cashflow'], ['capital', 'projects'], ['rules', 'ar'], ['rules', 'ap'],
  ['cashbooks', 'reports'], ['capital', 'reports'], ['ar', 'cashflow'], ['ap', 'cashflow'],
];

const kindColor: Record<string, string> = { system: '#38BDF8', concept: '#818CF8', rule: '#A78BFA' };
const kindLabel: Record<string, string> = { system: 'System', concept: 'Concept', rule: 'Rule' };
const filters: { id: 'all' | NodeDef['kind']; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'system', label: 'Systems' },
  { id: 'concept', label: 'Concepts' },
  { id: 'rule', label: 'Rules' },
];

function GraphNode({ data }: { data: { label: string; kind: string; dimmed: boolean; selected: boolean } }) {
  return (
    <div
      className="px-4 py-2.5 rounded-xl efi-glass-strong text-[12.5px] font-medium text-[var(--efi-ink-0)] whitespace-nowrap transition-all duration-300"
      style={{
        boxShadow: data.selected ? `0 0 40px -6px ${kindColor[data.kind]}` : `0 0 22px -10px ${kindColor[data.kind]}`,
        opacity: data.dimmed ? 0.28 : 1,
        borderColor: data.selected ? kindColor[data.kind] : undefined,
        transform: data.selected ? 'scale(1.08)' : 'scale(1)',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block mr-2" style={{ background: kindColor[data.kind] }} />
      {data.label}
    </div>
  );
}

const nodeTypes = { graphNode: GraphNode };

export default function KnowledgeGraph() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | NodeDef['kind']>('all');

  const connectedIds = useMemo(() => {
    if (!selected) return new Set<string>();
    const set = new Set<string>([selected]);
    edgeDefs.forEach(([a, b]) => {
      if (a === selected) set.add(b);
      if (b === selected) set.add(a);
    });
    return set;
  }, [selected]);

  const visibleNodeIds = useMemo(
    () => new Set(nodeDefs.filter((n) => filter === 'all' || n.kind === filter).map((n) => n.id)),
    [filter]
  );

  const nodes: Node[] = useMemo(() => nodeDefs
    .filter((n) => visibleNodeIds.has(n.id))
    .map((n) => ({
      id: n.id,
      position: { x: n.x + 400, y: n.y + 350 },
      data: {
        label: n.label,
        kind: n.kind,
        selected: selected === n.id,
        dimmed: selected ? !connectedIds.has(n.id) : false,
      },
      type: 'graphNode',
    })), [visibleNodeIds, selected, connectedIds]);

  const edges: Edge[] = useMemo(() => edgeDefs
    .filter(([a, b]) => visibleNodeIds.has(a) && visibleNodeIds.has(b))
    .map(([a, b], i) => {
      const isHighlighted = selected ? (a === selected || b === selected) : false;
      const isDimmed = selected ? !isHighlighted : false;
      return {
        id: `e-${i}`,
        source: a,
        target: b,
        animated: !isDimmed,
        style: {
          stroke: isHighlighted ? '#38BDF8' : 'rgba(56,189,248,0.3)',
          strokeWidth: isHighlighted ? 2 : 1,
          opacity: isDimmed ? 0.15 : 1,
          transition: 'opacity 0.3s, stroke-width 0.3s',
        },
      };
    }), [visibleNodeIds, selected]);

  const onNodeClick: NodeMouseHandler = useCallback((_e, node) => {
    setSelected((prev) => (prev === node.id ? null : node.id));
  }, []);

  const selectedNode = nodeDefs.find((n) => n.id === selected);
  const connectedNodes = selectedNode ? nodeDefs.filter((n) => connectedIds.has(n.id) && n.id !== selectedNode.id) : [];

  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1400px] mx-auto relative">
      <CursorSpotlight />
      <div className="mb-4 text-center">
        <div className="inline-flex items-center gap-2 text-[var(--efi-accent-cyan)]/80 text-[12px] font-mono mb-3">
          <Share2 size={13} /> TiAuto Finance Knowledge Graph
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-[var(--efi-ink-0)]">How TiAuto's finance knowledge connects</h1>
        <p className="text-[11.5px] text-[var(--efi-ink-2)] mt-2">Click a node to expand its connections. Scroll to zoom, drag to pan. Not sourced from live systems.</p>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {filters.map((f) => (
          <MagneticButton
            key={f.id}
            onClick={() => { setFilter(f.id); setSelected(null); }}
            className={`text-[12px] px-3.5 py-1.5 rounded-full transition-colors ${filter === f.id ? 'efi-glass-strong text-[var(--efi-ink-0)]' : 'efi-glass text-[var(--efi-ink-2)] hover:text-[var(--efi-ink-0)]'}`}
            strength={6}
          >
            {f.label}
          </MagneticButton>
        ))}
      </div>

      <div className="relative h-[640px] rounded-2xl efi-glass overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          nodesDraggable
          zoomOnScroll
          panOnScroll={false}
          onNodeClick={onNodeClick}
          onPaneClick={() => setSelected(null)}
          minZoom={0.4}
          maxZoom={2}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="rgba(150,180,255,0.15)" />
          <Controls showInteractive={false} className="!bg-transparent [&>button]:!bg-[rgba(30,41,59,0.86)] [&>button]:!border-white/10 [&>button]:!fill-white [&>button]:!text-white" />
        </ReactFlow>

        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-4 right-4 w-[300px] max-h-[600px] overflow-y-auto efi-scrollbar-none efi-glass-strong rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-[10px] uppercase tracking-wide font-mono" style={{ color: kindColor[selectedNode.kind] }}>{kindLabel[selectedNode.kind]}</div>
                  <div className="font-display text-[15px] font-medium text-[var(--efi-ink-0)] mt-1">{selectedNode.label}</div>
                </div>
                <button onClick={() => setSelected(null)} className="text-[var(--efi-ink-2)] hover:text-[var(--efi-ink-0)]">
                  <X size={16} />
                </button>
              </div>
              <p className="text-[12.5px] text-[var(--efi-ink-1)] leading-relaxed mb-4">{selectedNode.detail}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full ${selectedNode.governance === 'Approved' ? 'text-[var(--efi-accent-emerald)] bg-emerald-400/10' : 'text-[var(--efi-accent-amber)] bg-amber-400/10'}`}>
                  <ShieldCheck size={11} /> {selectedNode.governance}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full efi-glass text-[var(--efi-ink-2)]">
                  <Clock size={11} /> {selectedNode.freshness}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <User size={13} className="text-[var(--efi-ink-2)] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[9.5px] uppercase tracking-wide text-[var(--efi-ink-2)]">Data Owner</div>
                    <div className="text-[12px] text-[var(--efi-ink-0)]">{selectedNode.dataOwner}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Bot size={13} className="text-[var(--efi-ink-2)] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[9.5px] uppercase tracking-wide text-[var(--efi-ink-2)] mb-1">Agents Using This</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.agentsUsing.map((a) => (
                        <span key={a} className="text-[10.5px] px-2 py-0.5 rounded-full efi-glass text-[var(--efi-ink-1)]">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Gavel size={13} className="text-[var(--efi-ink-2)] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[9.5px] uppercase tracking-wide text-[var(--efi-ink-2)] mb-1">Decisions Supported</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.decisionsSupported.map((d) => (
                        <span key={d} className="text-[10.5px] px-2 py-0.5 rounded-full efi-glass text-[var(--efi-ink-1)]">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {connectedNodes.length > 0 && (
                <>
                  <div className="text-[10px] uppercase tracking-wide text-[var(--efi-ink-2)] font-medium mb-2">Connected to</div>
                  <div className="flex flex-wrap gap-1.5">
                    {connectedNodes.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => setSelected(n.id)}
                        className="text-[11px] px-2.5 py-1 rounded-full efi-glass text-[var(--efi-ink-1)] hover:text-[var(--efi-ink-0)] transition-colors"
                      >
                        {n.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
