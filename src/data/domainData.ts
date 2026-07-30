// All content on these screens is illustrative and qualitative. It is designed to
// demonstrate how TiAuto Finance Intelligence would reason and communicate —
// it is grounded in the May 2026 TiAuto MBR and remains a demonstration, not a live system connection.

export interface Priority {
  id: string;
  domain: string;
  title: string;
  detail: string;
  indicator: string;
  severity: 'critical' | 'elevated' | 'watch';
  icon: string;
}

export interface KpiRing {
  id: string;
  label: string;
  value: number;
  color: string;
  sublabel: string;
}

export const kpiRings: KpiRing[] = [
  { id: 'working-capital', label: 'Working Capital', value: 72, color: '#38BDF8', sublabel: 'Collections focus' },
  { id: 'cash', label: 'Cash', value: 66, color: '#10B981', sublabel: 'R8.5m banking exposure' },
  { id: 'close', label: 'Close', value: 100, color: '#FACC15', sublabel: 'On time' },
  { id: 'capital', label: 'Payments', value: 88, color: '#818CF8', sublabel: '264 captured' },
  { id: 'revenue', label: 'Collections', value: 93, color: '#FB7185', sublabel: 'R63m vs R68m' },
  { id: 'cashbooks', label: 'Reconciliations', value: 100, color: '#38BDF8', sublabel: 'Coverage complete' },
];

export const domainHealth: Record<string, { score: number; trend: 'up' | 'down' | 'flat'; note: string }> = {
  'working-capital': { score: 72, trend: 'flat', note: 'DSO at 33 days; collections R5m below target' },
  'financial-close': { score: 100, trend: 'up', note: 'May month-end completed on time with no issues' },
  cashbooks: { score: 66, trend: 'down', note: 'R8.5m cash and card drops not banked' },
  capital: { score: 88, trend: 'up', note: '264 payments captured; automation conversion in progress' },
  reconciliation: { score: 100, trend: 'up', note: 'May reconciliation coverage calculated at 100%' },
  'operating-model': { score: 74, trend: 'up', note: '5 FY26 projects completed; 3 deployments in progress' },
  'board-reporting': { score: 82, trend: 'up', note: 'MBR data ready for AI-generated executive narrative' },
};

export const executivePriorities: Priority[] = [
  {
    id: 'wc-01',
    domain: 'Working Capital',
    title: 'Collections below monthly target despite stable DSO',
    detail: 'May collections reached R63m against the R68m target. DSO remains controlled at 33 days, but Continental and ABSA Fleet require focused action.',
    indicator: 'R5m target gap',
    severity: 'critical',
    icon: 'wallet',
  },
  {
    id: 'fc-01',
    domain: 'Financial Close',
    title: 'Store cash and card drops not yet banked',
    detail: 'Cash and card drops not reflected as banked total R8.5m across 495 transactions, requiring store-level ageing and escalation.',
    indicator: 'R8.5m exposure · 495 transactions',
    severity: 'elevated',
    icon: 'layers',
  },
  {
    id: 'tr-01',
    domain: 'Cashbooks & Banking',
    title: 'ABSA Fleet allocation delays',
    detail: 'ABSA remittances contain incomplete or ambiguous information, contributing R114k to balances over 60 days.',
    indicator: 'R114k allocation exposure',
    severity: 'elevated',
    icon: 'landmark',
  },
  {
    id: 'cp-01',
    domain: 'Capital',
    title: 'Payment automation delivery dependency',
    detail: 'The payment-sheet automation is developed, but the Python conversion and SI report installation remain dependencies before full production use.',
    indicator: 'Target date at risk',
    severity: 'watch',
    icon: 'radio-tower',
  },
  {
    id: 'ra-01',
    domain: 'Revenue Assurance',
    title: 'Continental campaign balance outstanding',
    detail: 'The R345k Continental Easter Campaign balance remains outstanding and requires a clear collection owner, promise date and escalation path.',
    indicator: 'R345k collection action',
    severity: 'critical',
    icon: 'shield-alert',
  },
];

export interface RecommendedAction {
  id: string;
  title: string;
  owner: string;
  eta: string;
  confidence: number;
}

export const recommendedActions: RecommendedAction[] = [
  { id: 'act-1', title: 'Escalate Continental and ABSA Fleet collection actions', owner: 'Working Payment Automation Specialist', eta: 'This week', confidence: 82 },
  { id: 'act-2', title: 'Resolve and age the R8.5m unbanked store exposure', owner: 'Financial Close Specialist', eta: 'Before close sign-off', confidence: 78 },
  { id: 'act-3', title: 'Complete Python conversion and SI report dependency for payment automation', owner: 'Cashbooks Specialist', eta: 'Within the policy window', confidence: 74 },
  { id: 'act-4', title: 'Prioritise 60+ day fleet balances below the agreed threshold', owner: 'Collections Specialist', eta: 'This month', confidence: 76 },
];

export interface AgentSpecialist {
  id: string;
  name: string;
  domain: string;
  systems: string[];
  icon: string;
  color: string;
}

// System names below describe the target-state sources this specialist would draw on
// once connected — this demonstration does not have a live connection to them.
export const specialists: AgentSpecialist[] = [
  { id: 'orchestrator', name: 'Finance Intelligence Orchestrator', domain: 'Coordination', systems: [], icon: 'brain-circuit', color: 'var(--efi-cyan)' },
  { id: 'wc', name: 'Working Payment Automation Specialist', domain: 'AR, AP and cash conversion', systems: ['AR Ageing reports', 'AP Ageing reports', 'Executive briefings'], icon: 'wallet', color: 'var(--efi-blue)' },
  { id: 'cash', name: 'Cash & Liquidity Specialist', domain: 'Liquidity and forecasting', systems: ['Cash flow reports', 'cashbook and bank positions'], icon: 'coins', color: 'var(--efi-mint)' },
  { id: 'cashbooks', name: 'Cashbooks Specialist', domain: 'banking, deposits and allocations', systems: ['bank statements and cashbook extracts', 'unbanked deposit reports'], icon: 'landmark', color: 'var(--efi-violet)' },
  { id: 'close', name: 'Financial Close Specialist', domain: 'GL and consolidation', systems: ['General ledger extracts', 'Consolidation packs'], icon: 'layers', color: 'var(--efi-amber)' },
  { id: 'reconciliation', name: 'Reconciliation Specialist', domain: 'Statement and ledger matching', systems: ['Bank statements', 'GL, AR and AP extracts'], icon: 'scan-search', color: 'var(--efi-cyan)' },
  { id: 'capital', name: 'Payment Automation Specialist', domain: 'Payments, automation and control', systems: ['Payment files', 'Automation trackers'], icon: 'radio-tower', color: 'var(--efi-blue)' },
  { id: 'revenue', name: 'Collections Specialist', domain: 'Billing integrity', systems: ['Billing extracts', 'Tariff mapping tables'], icon: 'shield-alert', color: 'var(--efi-rose)' },
  { id: 'board', name: 'Board Reporting Specialist', domain: 'Executive narrative', systems: ['Consolidated finance packs', 'Prior board reports'], icon: 'presentation', color: 'var(--efi-cyan)' },
];

export const askExample = 'Why are collections below target?';

export const askResponse = {
  situation: 'May collections closed at R63m against the R68m target. DSO remains at 33 days, but cash is trapped in specific fleet balances, allocation delays and unbanked store transactions.',
  evidence: [
    'DSO is 33 days, within the recent three-month average of 34 days.',
    'Continental R345k and ABSA Fleet R114k are the clearest named collection and allocation exceptions.',
    'AP processed 264 payments while the payment automation conversion remains in progress.',
    'R8.5m of cash and card drops were not yet reflected as banked at month-end.',
  ],
  recommendation: 'Prioritise Continental and ABSA Fleet actions, clear store banking exceptions and protect the current AP payment timetable while automation dependencies are resolved.',
  actions: [
    'Confirm Continental and ABSA Fleet owners, promise dates and escalation steps',
    'Review the top five fleet balances and 60+ day movement weekly',
    'Model the cash effect of recovering the R5m collection gap and reducing unbanked exposure',
  ],
  dataRequired: [
    'Current AR Ageing report (Fleet & Corporate Accounts)',
    'Current AP Ageing report (Accounts Payable)',
    'Latest cash flow and bank-status report',
    'Business validation from Accounts Receivable',
  ],
  confidence: 'Medium — directional, pending validation against current source data',
};

export interface CloseActivity {
  id: string;
  businessUnit: string;
  activity: string;
  status: 'complete' | 'in-progress' | 'blocked';
  owner: string;
}

export const closeActivities: CloseActivity[] = [
  { id: 'c1', businessUnit: 'Shared Services', activity: 'Intercompany reconciliation', status: 'complete', owner: 'F&A Team' },
  { id: 'c2', businessUnit: 'Accounts Payable', activity: 'Capitalisation review', status: 'blocked', owner: 'Capital Accounting' },
  { id: 'c3', businessUnit: 'Fleet & Corporate Accounts', activity: 'Revenue cut-off validation', status: 'in-progress', owner: 'Revenue Assurance' },
  { id: 'c4', businessUnit: 'Retail Stores', activity: 'Bad debt provision review', status: 'in-progress', owner: 'Accounts Receivable' },
  { id: 'c5', businessUnit: 'Cashbooks & Banking', activity: 'bank and cashbook reconciliation', status: 'complete', owner: 'Cashbooks' },
  { id: 'c6', businessUnit: 'Finance Management', activity: 'Trial balance lock', status: 'in-progress', owner: 'TiAuto Finance Management' },
];

export interface CapitalProject {
  id: string;
  name: string;
  phase: string;
  progress: number; // 0-100, illustrative pacing indicator only
  pacing: 'ahead' | 'on-track' | 'behind';
  pacingNote: string;
  depreciationStart: string;
}

export const capitalProjects: CapitalProject[] = [
  { id: 'p1', name: 'BIO Payment Posting Automation', phase: 'Construction', progress: 78, pacing: 'ahead', pacingNote: 'Spend pacing ahead of associated revenue recognition', depreciationStart: 'Target: next fiscal quarter' },
  { id: 'p2', name: 'Store Invoice Digitisation', phase: 'Rollout', progress: 64, pacing: 'on-track', pacingNote: 'Tracking to plan', depreciationStart: 'Target: current fiscal quarter' },
  { id: 'p3', name: 'Cashbook Reconciliation Automation', phase: 'Testing', progress: 91, pacing: 'on-track', pacingNote: 'Tracking to plan, nearing completion', depreciationStart: 'Target: current fiscal quarter' },
  { id: 'p4', name: 'Discovery Bulk Payments', phase: 'Planning', progress: 18, pacing: 'behind', pacingNote: 'Early phase, timeline under confirmation', depreciationStart: 'Target: to be confirmed' },
];

// ---- Executive Finance Briefing ----

export interface BriefingSection {
  id: string;
  domain: string;
  situation: string;
  evidence: string[];
  recommendedAction: string;
  decisionRequired: string;
  confidence: string;
}

export const briefingSections: BriefingSection[] = [
  {
    id: 'working-capital',
    domain: 'Working Capital',
    situation: 'Working capital requires focused management attention based on collections, payment timing and cash visibility indicators.',
    evidence: [
      'AR ageing requires review, particularly within the Fleet & Corporate Accounts',
      'AP payment timing needs alignment with the current cash position',
      'Cashbook and banking visibility should be linked into the working capital view',
      'Supplier payment commitments may influence short-term liquidity planning',
    ],
    recommendedAction: 'Run a controlled Working Capital Intelligence pilot using AR Ageing, AP Ageing and Cash Flow reports.',
    decisionRequired: 'Confirm whether Working Capital Intelligence should be the first proof of value.',
    confidence: 'Medium — dependent on source-data availability and business validation.',
  },
  {
    id: 'financial-close',
    domain: 'Financial Close',
    situation: 'Close cycle visibility is currently reactive, with outstanding activities and variances typically surfacing late in the cycle.',
    evidence: [
      'Capitalisation postings in Accounts Payable warrant closer review this cycle',
      'Close activity status is tracked manually across business units',
      'Variance detection currently depends on individual reviewer judgement',
    ],
    recommendedAction: 'Pilot Financial Close Intelligence on one business unit to test earlier variance detection.',
    decisionRequired: 'Confirm the business unit and close cycle to use for the pilot.',
    confidence: 'Medium — requires close-calendar alignment with TiAuto Finance Management.',
  },
  {
    id: 'cashbooks',
    domain: 'Cashbooks & Banking',
    situation: 'Store deposits and allocation exceptions require clearer ageing, ownership and escalation visibility.',
    evidence: [
      'Unbanked store deposits should be aged and assigned to accountable owners',
      'Allocation and banking follow-up currently relies on periodic manual review',
    ],
    recommendedAction: 'Extend the Working Capital pilot scope to include a store banking exposure view once validated.',
    decisionRequired: 'Confirm Cashbooks and Store Banking as a second-phase focus area after the working-capital pilot.',
    confidence: 'Low-Medium — indicative only, pending banking data validation.',
  },
];

// ---- Microsoft Operating Model ----

export interface OperatingLayer {
  title: string;
  icon: string;
  items: string[];
}

export const operatingLayers: OperatingLayer[] = [
  { title: 'Business Users', icon: 'users', items: ['TiAuto Finance', 'Shared Services', 'Executive Committee'] },
  { title: 'Microsoft Teams / Copilot', icon: 'message-square', items: ['Conversational access', 'Approvals in the flow of work'] },
  { title: 'TiAuto Finance Intelligence', icon: 'sparkles', items: ['Orchestration layer', 'Executive narrative generation'] },
  { title: 'Finance Specialists / Agents', icon: 'users-round', items: ['Working Capital', 'Close', 'Cashbooks', 'Payments', 'Collections'] },
  { title: 'Knowledge Layer', icon: 'database', items: ['Semantic model', 'Business rules and policy'] },
  { title: 'Source Systems', icon: 'server', items: ['Sage', 'Power BI', 'SharePoint', 'Supplier & payment files', 'BIO', 'bank statements and cashbook extracts'] },
  { title: 'Governance', icon: 'shield-check', items: ['Entra ID', 'Purview', 'Responsible AI framework', 'Human oversight'] },
];

// ---- Roadmap / The Ask ----

export interface PilotOption {
  id: string;
  name: string;
  whyItMatters: string;
  dataNeeded: string[];
  businessOwner: string;
  expectedOutput: string;
}

export const pilotOptions: PilotOption[] = [
  {
    id: 'working-capital',
    name: 'Working Capital Intelligence',
    whyItMatters: 'Cash tied up in receivables and payables directly affects TiAuto liquidity and is felt every month.',
    dataNeeded: ['AR Ageing report', 'AP Ageing report', 'Cash flow report'],
    businessOwner: 'Accounts Receivable / Shared Services Finance',
    expectedOutput: 'A validated view of where working capital is under pressure and what to do about it, refreshed against real data.',
  },
  {
    id: 'financial-close',
    name: 'Financial Close Intelligence',
    whyItMatters: 'Earlier visibility into close variances reduces last-minute close-day surprises and rework.',
    dataNeeded: ['Trial balance extracts', 'Close activity tracker', 'Capitalisation postings'],
    businessOwner: 'TiAuto Finance / Accounts Payable',
    expectedOutput: 'A tested pattern for surfacing close exceptions earlier in the cycle for one business unit.',
  },
  {
    id: 'reconciliation',
    name: 'Reconciliation Intelligence',
    whyItMatters: 'Manual reconciliation across bank, GL, AR and AP is time-intensive and exception-prone.',
    dataNeeded: ['Bank statement extracts', 'GL extract', 'AR and AP extracts'],
    businessOwner: 'Financial Accounting',
    expectedOutput: 'A working exceptions-only reconciliation view validated against one month of real data.',
  },
  {
    id: 'board-reporting',
    name: 'Executive Board Reporting',
    whyItMatters: 'Board packs currently take days to compile manually across multiple sources.',
    dataNeeded: ['Consolidated finance pack', 'Prior board reports', 'EXCO commentary'],
    businessOwner: 'TiAuto Finance / Office of the CFO',
    expectedOutput: 'A draft board narrative generated from the same inputs used today, for editorial review.',
  },
];

export const proofTimeline = [
  { id: 'w1', range: 'Week 1–2', title: 'Confirm business problem and data pack', detail: 'Agree the pilot scope, business owner and the specific data extracts required.' },
  { id: 'w2', range: 'Week 3–4', title: 'Build controlled proof', detail: 'Build the pilot against the agreed data pack in a controlled, non-production environment.' },
  { id: 'w3', range: 'Week 5–6', title: 'Validate with business users', detail: 'Business owners test the output against what they already know to be true.' },
  { id: 'w4', range: 'Week 7–8', title: 'Executive readout and scale decision', detail: 'Present findings to the Executive Committee and agree whether to scale.' },
];
