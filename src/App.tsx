import { useEffect, useState } from 'react';
import { initSoundPreference } from './utils/sound';
import { initTheme } from './utils/themePref';
import Landing from './pages/Landing';
import ExecutiveStory from './pages/ExecutiveStory';
import AppShell from './components/AppShell';
import CommandCentre from './pages/CommandCentre';
import ExecutiveFinanceBriefing from './pages/ExecutiveFinanceBriefing';
import AskFinanceIntelligence from './pages/AskFinanceIntelligence';
import AgentMissionControl from './pages/AgentMissionControl';
import DomainIntelligence from './pages/DomainIntelligence';
import WorkingCapital from './pages/WorkingCapital';
import FinancialClose from './pages/FinancialClose';
import Reconciliation from './pages/Reconciliation';
import CapitalManagement from './pages/CapitalManagement';
import CashbooksBanking from './pages/CashbooksBanking';
import BoardReporting from './pages/BoardReporting';
import KnowledgeGraph from './pages/KnowledgeGraph';
import OperatingModel from './pages/OperatingModel';
import Roadmap from './pages/Roadmap';
import type { ScreenId } from './data/nav';

type AppPhase = 'landing' | 'story' | 'app';

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('landing');
  const [screen, setScreen] = useState<ScreenId>('command-centre');

  useEffect(() => {
    initSoundPreference();
    initTheme();
  }, []);

  if (phase === 'landing') return <Landing onEnter={() => setPhase('story')} />;
  if (phase === 'story') return <ExecutiveStory onComplete={() => setPhase('app')} />;

  const renderScreen = () => {
    switch (screen) {
      case 'command-centre': return <CommandCentre onNavigate={setScreen} />;
      case 'briefing': return <ExecutiveFinanceBriefing />;
      case 'ask': return <AskFinanceIntelligence />;
      case 'mission-control': return <AgentMissionControl />;
      case 'domain-intelligence': return <DomainIntelligence onNavigate={setScreen} />;
      case 'working-capital': return <WorkingCapital />;
      case 'financial-close': return <FinancialClose />;
      case 'reconciliation': return <Reconciliation />;
      case 'capital': return <CapitalManagement />;
      case 'cashbooks': return <CashbooksBanking />;
      case 'board-reporting': return <BoardReporting />;
      case 'knowledge-graph': return <KnowledgeGraph />;
      case 'operating-model': return <OperatingModel />;
      case 'roadmap': return <Roadmap />;
      default: return <CommandCentre onNavigate={setScreen} />;
    }
  };

  return (
    <AppShell active={screen} onNavigate={setScreen}>
      {renderScreen()}
    </AppShell>
  );
}
