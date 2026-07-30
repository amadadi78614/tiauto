import type { Priority, KpiRing, RecommendedAction, AgentSpecialist, CapitalProject } from './domainData';

export const kpiRingsJune: KpiRing[] = [
  { id: 'ar', label: 'Accounts Receivable', value: 80, color: '#38BDF8', sublabel: 'DSO 35 days' },
  { id: 'ap', label: 'Accounts Payable', value: 90, color: '#818CF8', sublabel: 'R401m BIO approvals' },
  { id: 'cashbooks', label: 'Cashbooks', value: 90, color: '#10B981', sublabel: '99.93% accuracy' },
  { id: 'close', label: 'Month / Year-End', value: 100, color: '#FACC15', sublabel: 'On time · no issues' },
  { id: 'recons', label: 'Reconciliations', value: 100, color: '#34D8FF', sublabel: 'Coverage complete' },
  { id: 'transformation', label: 'Transformation', value: 76, color: '#FB7185', sublabel: '13 complete · 2 in progress' },
];

export const executivePrioritiesJune: Priority[] = [
  {
    id: 'ar-dso', domain: 'Accounts Receivable',
    title: 'DSO increased to 35 days',
    detail: 'June DSO moved from 33 to 35 days. It remains within the 36–40 day SLA, but the direction requires tighter Top 30 Fleet management and 60+ day ageing control.',
    indicator: '35 days · 3-month average 34', severity: 'critical', icon: 'wallet',
  },
  {
    id: 'cb-drops', domain: 'Cashbooks & Store Banking',
    title: 'R5.3m in cash and card drops not banked',
    detail: '468 transactions were reported as not banked for June. Store-level ageing and continuous cash-drop follow-up remain essential.',
    indicator: 'R5.3m · 468 transactions', severity: 'critical', icon: 'landmark',
  },
  {
    id: 'ar-unallocated', domain: 'Accounts Receivable',
    title: 'Unallocated receipts require closure',
    detail: 'TNM has R4k and TWT R83k in unallocated receipts. These amounts are small relative to the ledger but signal avoidable allocation friction.',
    indicator: 'R87k unallocated', severity: 'elevated', icon: 'layers',
  },
  {
    id: 'ap-bottleneck', domain: 'Accounts Payable',
    title: 'Store invoice delays are creating month-end pressure',
    detail: 'Invoices not processed by stores and missing new-store account letters are delaying GRV processing and creating unnecessary month-end bottlenecks.',
    indicator: 'Operational control gap', severity: 'elevated', icon: 'shield-alert',
  },
  {
    id: 'transformation', domain: 'Transformation',
    title: 'Payment automation remains dependent on Python conversion and SI report access',
    detail: 'Phase 1 is complete, but conversion of the current bot to Python and installation of the SI report in the VM remain critical dependencies.',
    indicator: '~32 hours opportunity', severity: 'watch', icon: 'radio-tower',
  },
];

export const recommendedActionsJune: RecommendedAction[] = [
  { id: 'j1', title: 'Launch a Top 30 Fleet and 60+ day collections sprint', owner: 'Accounts Receivable Lead', eta: 'Start this week', confidence: 94 },
  { id: 'j2', title: 'Age and assign all R5.3m unbanked cash/card exceptions by store', owner: 'Cashbooks Lead', eta: 'Within 48 hours', confidence: 96 },
  { id: 'j3', title: 'Clear TNM and TWT unallocated receipts and remove root causes', owner: 'AR Allocations Team', eta: 'Before next close', confidence: 92 },
  { id: 'j4', title: 'Resolve Python conversion and SI report dependencies for payment automation', owner: 'Transformation Owner', eta: 'Decision this week', confidence: 88 },
];

export const specialistsJune: AgentSpecialist[] = [
  { id: 'orchestrator', name: 'Finance Intelligence Orchestrator', domain: 'Coordination', systems: [], icon: 'brain-circuit', color: 'var(--efi-cyan)' },
  { id: 'wc', name: 'Collections & DSO Agent', domain: 'Fleet, ageing and cash conversion', systems: ['AR ageing', 'Fleet balances', 'Allocation reports'], icon: 'wallet', color: 'var(--efi-blue)' },
  { id: 'cash', name: 'Store Banking Agent', domain: 'Cash/card deposits and banking exceptions', systems: ['Cash drop reports', 'Card settlement reports', 'Bank statements'], icon: 'coins', color: 'var(--efi-mint)' },
  { id: 'cashbooks', name: 'Cashbooks Control Agent', domain: 'Cashbooks, journals and bank charges', systems: ['Sage cashbooks', 'Bank statements', 'Journal extracts'], icon: 'landmark', color: 'var(--efi-violet)' },
  { id: 'close', name: 'Month-End Agent', domain: 'Close readiness and audit evidence', systems: ['Close calendar', 'Reconciliations', 'Audit evidence'], icon: 'layers', color: 'var(--efi-amber)' },
  { id: 'reconciliation', name: 'Reconciliation Agent', domain: 'AP, AR and CB matching', systems: ['Supplier recons', 'Bank recons', 'Sub-ledgers'], icon: 'scan-search', color: 'var(--efi-cyan)' },
  { id: 'capital', name: 'Payments & Automation Agent', domain: 'BIO, SAGE and Python automation', systems: ['BIO approvals', 'Payment sheets', 'Transformation tracker'], icon: 'radio-tower', color: 'var(--efi-blue)' },
  { id: 'revenue', name: 'Fleet Allocation Agent', domain: 'Fleet and franchise allocations', systems: ['Fleet remittances', 'Franchise receipts', 'Store allocations'], icon: 'shield-alert', color: 'var(--efi-rose)' },
  { id: 'board', name: 'Executive Reporting Agent', domain: 'CFO and MBR narrative', systems: ['June MBR', 'SLA pack', 'Transformation portfolio'], icon: 'presentation', color: 'var(--efi-cyan)' },
];

export const askExampleJune = 'What should Charl focus on after the June MBR?';
export const askResponseJune = {
  situation: 'June month/year-end closed on time with no issues and all critical SLAs achieved. The main executive concerns are DSO moving to 35 days, R5.3m of cash and card drops not banked, R87k of unallocated TNM/TWT receipts, and transformation dependencies that are slowing automation value.',
  evidence: [
    'DSO is 35 days versus 33 days in April and May; the three-month average is 34 days.',
    'Cash and card drops not banked total R5.3m across 468 transactions.',
    'BIO payment approvals totalled R401m: Creditors R197m, Stores R5m, Transfers R180m and Head Office R19m.',
    'Cashbook accuracy reached 99.93% and reconciliation coverage remained 100%.',
  ],
  recommendation: 'Protect the strong control environment while launching focused missions for Fleet collections, store banking exceptions and transformation dependency removal.',
  actions: [
    'Run a Top 30 Fleet and 60+ day ageing sprint with daily recovery tracking',
    'Assign every unbanked cash/card exception to a store owner and ageing bucket',
    'Resolve SI report and Python conversion dependencies with accountable dates',
  ],
  dataRequired: ['Current AR ageing', 'Store banking exception report', 'BIO payment file', 'Transformation tracker'],
  confidence: 'High — grounded in the June 2026 MBR; live operational validation still required',
};

export const transformationProjectsJune: CapitalProject[] = [
  { id: 'p32', name: 'BIO Payment Posting & Upload Automation', phase: 'Phase 1 complete', progress: 68, pacing: 'behind', pacingNote: 'Python conversion and SI report dependency outstanding', depreciationStart: 'Dependency decision required' },
  { id: 'p33', name: 'Recurring Journals Automation', phase: 'Development', progress: 55, pacing: 'on-track', pacingNote: 'Bank charges, collection fees and PayJustNow journals', depreciationStart: 'Target 31 Aug' },
  { id: 'p38', name: 'Intercompany Sheet Transformation', phase: 'Diagnostic', progress: 35, pacing: 'on-track', pacingNote: 'AP/AR compilation redesign under analysis', depreciationStart: 'Target 04 Aug' },
  { id: 'p37', name: 'Standard Bank U-count Invoice Automation', phase: 'Testing', progress: 90, pacing: 'ahead', pacingNote: 'Completed and handed to Operations for testing', depreciationStart: 'Operational acceptance' },
  { id: 'p34', name: 'Discovery Bulk Payments', phase: 'Pipeline', progress: 15, pacing: 'behind', pacingNote: 'Scope and target date still to be confirmed', depreciationStart: 'TBC' },
  { id: 'p40', name: 'ABSA Bank Statement Downloads', phase: 'Work in progress', progress: 45, pacing: 'on-track', pacingNote: 'Maintenance initiative across F&A streams', depreciationStart: 'In delivery' },
];
