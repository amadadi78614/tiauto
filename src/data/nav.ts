export type ScreenId =
  | 'landing'
  | 'story'
  | 'command-centre'
  | 'briefing'
  | 'ask'
  | 'mission-control'
  | 'domain-intelligence'
  | 'working-capital'
  | 'financial-close'
  | 'reconciliation'
  | 'capital'
  | 'cashbooks'
  | 'board-reporting'
  | 'knowledge-graph'
  | 'operating-model'
  | 'roadmap';

export interface NavItem {
  id: ScreenId;
  label: string;
  group: string;
}

export const navItems: NavItem[] = [
  { id: 'command-centre', label: 'Executive Command Centre', group: 'Executive' },
  { id: 'briefing', label: 'Executive Finance Briefing', group: 'Executive' },
  { id: 'ask', label: 'Ask Finance Intelligence', group: 'Intelligence' },
  { id: 'mission-control', label: 'Agent Mission Control', group: 'Intelligence' },
  { id: 'domain-intelligence', label: 'Finance Intelligence Domains', group: 'Intelligence' },
  { id: 'working-capital', label: 'Working Capital', group: 'Domains' },
  { id: 'financial-close', label: 'Financial Close', group: 'Domains' },
  { id: 'reconciliation', label: 'Reconciliation Intelligence', group: 'Domains' },
  { id: 'capital', label: 'Payments & Automation', group: 'Domains' },
  { id: 'cashbooks', label: 'Cashbooks & Store Banking', group: 'Domains' },
  { id: 'board-reporting', label: 'Board & MBR Reporting', group: 'Executive' },
  { id: 'knowledge-graph', label: 'Knowledge Layer', group: 'Platform' },
  { id: 'operating-model', label: 'Operating Model', group: 'Platform' },
  { id: 'roadmap', label: '90-Day Activation Plan', group: 'Platform' },
];
