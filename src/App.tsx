import { useEffect, useState } from 'react';
import { initSoundPreference } from './utils/sound';
import { initTheme } from './utils/themePref';
import Landing from './pages/Landing';
import ExecutiveStory from './pages/ExecutiveStory';
import AppShell from './components/AppShell';
import CommandCentreV3 from './pages/CommandCentreV3';
import ExecutiveFinanceBriefing from './pages/ExecutiveFinanceBriefing';
import AskFinanceIntelligence from './pages/AskFinanceIntelligence';
import AgentMissionControlV3 from './pages/AgentMissionControlV3';
import DomainIntelligence from './pages/DomainIntelligence';
import WorkingCapital from './pages/WorkingCapital';
import FinancialClose from './pages/FinancialClose';
import Reconciliation from './pages/Reconciliation';
import TransformationPortfolioV3 from './pages/TransformationPortfolioV3';
import CashbooksBankingV3 from './pages/CashbooksBankingV3';
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
      case 'command-centre': return <CommandCentreV3 onNavigate={setScreen} />;
      case 'briefing': return <ExecutiveFinanceBriefing />;
      case 'ask': return <AskFinanceIntelligence />;
      case 'mission-control': return <AgentMissionControlV3 />;
      case 'domain-intelligence': return <DomainIntelligence onNavigate={setScreen} />;
      case 'working-capital': return <WorkingCapital />;
      case 'financial-close': return <FinancialClose />;
      case 'reconciliation': return <Reconciliation />;
      case 'capital': return <TransformationPortfolioV3 />;
      case 'cashbooks': return <CashbooksBankingV3 />;
      case 'board-reporting': return <BoardReporting />;
      case 'knowledge-graph': return <KnowledgeGraph />;
      case 'operating-model': return <OperatingModel />;
      case 'roadmap': return <Roadmap />;
      default: return <CommandCentreV3 onNavigate={setScreen} />;
    }
  };

  return <AppShell active={screen} onNavigate={setScreen}>{renderScreen()}</AppShell>;
}
