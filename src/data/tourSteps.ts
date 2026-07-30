import type { ScreenId } from './nav';

export interface TourStep {
  screen: ScreenId;
  title: string;
  message: string;
}

export const tourSteps: TourStep[] = [
  {
    screen: 'command-centre',
    title: 'Executive Command Centre',
    message: 'This is where a CFO would start the day — priorities across the enterprise, why each one matters, and what Finance recommends doing next. Nothing here is a raw KPI tile without context.',
  },
  {
    screen: 'briefing',
    title: 'Executive Finance Briefing',
    message: 'The boardroom-ready read. Situation, Evidence, Recommended Action, Decision Required, and how confident we are given the data available today.',
  },
  {
    screen: 'ask',
    title: 'Ask Finance Intelligence',
    message: 'Ask any finance question in plain language. It detects the intent, activates the relevant specialists, and builds an executive-grade answer — not the same response twice.',
  },
  {
    screen: 'mission-control',
    title: 'Agent Mission Control',
    message: 'This shows how the reasoning actually happens. One question is broken into specialist investigations, each specialist reports back, and they even consult each other before the orchestrator settles on one recommendation.',
  },
  {
    screen: 'domain-intelligence',
    title: 'Finance Intelligence Domains',
    message: 'Every finance domain sits on the same underlying intelligence core. Click into any domain — Working Capital, Financial Close, Cashbooks and Store Banking all live under the Domains section in the sidebar.',
  },
  {
    screen: 'knowledge-graph',
    title: 'Knowledge Graph',
    message: 'This is what makes the recommendations explainable rather than a black box — the systems, policies and business rules underneath every answer, with governance and data ownership visible on each node.',
  },
  {
    screen: 'operating-model',
    title: 'Operating Model',
    message: 'How this would actually sit inside TiAuto — embedded in Microsoft Teams and Copilot, governed end to end. Every layer here is target-state, not a claim about what exists today.',
  },
  {
    screen: 'roadmap',
    title: 'The Ask',
    message: 'And here is the actual ask: not an enterprise rollout, a controlled proof of value on one finance outcome, with a clear eight-week timeline to a scale decision.',
  },
];
