export interface ActivatedSpecialist {
  name: string;
  task: string;
}

export interface DriverBar {
  label: string;
  value: number;
}

export interface IntentChartData {
  drivers: DriverBar[];
  driversLabel: string;
  trend: number[];
  trendLabel: string;
  gaugeLabel: string;
  gaugeValue: number;
}

export interface AskIntentResponse {
  id: string;
  label: string;
  situation: string;
  evidence: string[];
  reasoningSummary: string;
  recommendation: string;
  decisionRequired: string;
  actions: string[];
  dataRequired: string[];
  businessImpact: string;
  confidence: string;
  confidenceScore: number;
  chartData: IntentChartData;
  specialists: ActivatedSpecialist[];
}

export interface AskIntent {
  id: string;
  keywords: string[];
  response: AskIntentResponse;
}

export const askIntents: AskIntent[] = [
  {
    id: 'working-capital',
    keywords: ['working capital', 'dso', 'collections', ' ar ', 'ar ageing', ' ap ', 'ageing', 'overdue', 'receivables', 'payables', 'cash conversion'],
    response: {
      id: 'working-capital',
      label: 'Working Capital',
      situation: 'Working capital requires focused management attention based on collections, payment timing and cash visibility indicators.',
      evidence: [
        'AR ageing requires review, particularly within the Fleet & Corporate Accounts',
        'AP payment timing needs alignment with the current cash position',
        'Cashbook and banking visibility should be linked into the working capital view',
        'Capital commitments may influence short-term liquidity planning',
      ],
      reasoningSummary: "Rising receivables age combined with slower payables points to a temporary cash squeeze rather than a structural funding issue — collections is the higher-leverage lever.",
      recommendation: 'Run a controlled Working Capital Intelligence pilot using AR Ageing, AP Ageing and Cash Flow reports.',
      decisionRequired: 'Confirm whether Working Capital Intelligence should be the first proof of value.',
      actions: [
        'Review the highest-value overdue accounts with collections leadership this week',
        'Schedule an Fleet & Corporate Accounts credit review for the next EXCO cycle',
        'Model a working capital improvement scenario against the latest liquidity forecast',
      ],
      dataRequired: ['Current AR Ageing report', 'Current AP Ageing report', 'Latest cashbook and bank-status report', 'Business validation from Accounts Receivable'],
      businessImpact: "A sustained DSO improvement of even a few days would materially ease near-term liquidity pressure without new funding.",
      confidence: 'Medium — dependent on source-data availability and business validation',
      confidenceScore: 62,
      chartData: { drivers: [{ label: "Fleet & Corporate Receivables", value: 82 }, { label: "Accounts Payable AP Timing", value: 61 }, { label: "Cashbook Linkage", value: 48 }, { label: "Supplier Payment Commitments", value: 35 }], trend: [40, 44, 49, 53, 58, 61, 64, 62], driversLabel: "Key Working Capital Drivers", trendLabel: "Cash Conversion Cycle Trend", gaugeLabel: "DSO Indicator", gaugeValue: 62 },
      specialists: [
        { name: 'Working Capital Specialist', task: 'Reviewing AR / AP movement' },
        { name: 'Cash & Liquidity Specialist', task: 'Checking cashbook and bank position' },
        { name: 'Cashbooks & Banking Specialist', task: 'Validating near-term liquidity' },
        { name: 'Board Reporting Specialist', task: 'Preparing executive summary' },
      ],
    },
  },
  {
    id: 'cash-liquidity',
    keywords: ['cash', 'liquidity', 'cashbooks', 'forecast', 'banking', 'bank', 'cash flow', 'short term cash', 'short-term cash'],
    response: {
      id: 'cash-liquidity',
      label: 'Cash & Liquidity',
      situation: 'Short-term cash visibility depends on consolidating cashbook and bank positions with operational collections and payment timing.',
      evidence: [
        'cashbook and bank position currently sits separately from the operational AR / AP view',
        'Funding headroom appears adequate against the committed capital programme',
        'The oldest store deposit and allocation exceptions should be checked against banking controls',
      ],
      reasoningSummary: "Cashbooks and Working Capital specialists cross-checked forecasts and agree liquidity is adequate today, but visibility beyond the current quarter is limited without a combined view.",
      recommendation: 'Link bank balances, store deposits and cashbook allocations into one working-capital view refreshed on a routine cycle.',
      decisionRequired: 'Confirm whether Cashbooks should nominate a data owner for a combined liquidity view pilot.',
      actions: [
        'Consolidate the latest cashbook and bank position with the AR / AP ageing view',
        'Review available bank position against the next two quarters of committed capital spend',
        'Flag unbanked deposits and unmatched allocations outside the agreed ageing threshold',
      ],
      dataRequired: ['Latest cashbook and bank-status report', 'Bank position and deposit-status report', 'unbanked deposit report'],
      businessImpact: "A unified liquidity view reduces the risk of a late surprise on available bank position during the next capital-intensive quarter.",
      confidence: 'Medium — directional, pending banking data validation',
      confidenceScore: 58,
      chartData: { drivers: [{ label: "Banking Visibility", value: 70 }, { label: "Available Bank Position", value: 55 }, { label: "Unbanked Deposit Watch", value: 44 }, { label: "AR/AP Timing Alignment", value: 38 }], trend: [35, 38, 42, 47, 50, 53, 55, 58], driversLabel: "Liquidity Drivers", trendLabel: "13-Week Cash Forecast", gaugeLabel: "Banking Control Risk", gaugeValue: 45 },
      specialists: [
        { name: 'Cash & Liquidity Specialist', task: 'Checking cashbook and bank position' },
        { name: 'Cashbooks & Banking Specialist', task: 'Reviewing available bank position' },
        { name: 'Working Capital Specialist', task: 'Cross-checking AR / AP timing' },
      ],
    },
  },
  {
    id: 'financial-close',
    keywords: ['close', 'month end', 'month-end', 'year end', 'year-end', 'journal', 'variance', 'accrual', 'trial balance', 'reporting pack'],
    response: {
      id: 'financial-close',
      label: 'Financial Close',
      situation: 'Close cycle visibility is currently reactive, with outstanding activities and variances typically surfacing late in the cycle.',
      evidence: [
        'Capitalisation postings in Accounts Payable warrant closer review this cycle',
        'Close activity status is tracked manually across business units',
        'Variance detection currently depends on individual reviewer judgement',
      ],
      reasoningSummary: "The capitalisation flag is isolated to three projects, not a systemic close issue, which keeps the overall close timeline recoverable.",
      recommendation: 'Pilot Financial Close Intelligence on one business unit to test earlier variance detection ahead of trial balance lock.',
      decisionRequired: 'Confirm the business unit and close cycle to use for the pilot.',
      actions: [
        'Hold flagged capitalisation postings pending Capital Accounting review',
        'Agree a standard variance threshold for automatic flagging',
        'Track outstanding close activities in a single shared view for this cycle',
      ],
      dataRequired: ['Trial balance extract', 'Close activity tracker', 'Capitalisation postings for the cycle'],
      businessImpact: "Resolving the capitalisation review before lock avoids a restatement risk and keeps the close on its committed date.",
      confidence: 'Medium — requires close-calendar alignment with TiAuto Finance Management',
      confidenceScore: 55,
      chartData: { drivers: [{ label: "Capitalisation Review", value: 75 }, { label: "Close Activity Tracking", value: 60 }, { label: "Variance Detection", value: 50 }, { label: "Trial Balance Readiness", value: 66 }], trend: [30, 35, 42, 48, 52, 55, 53, 55], driversLabel: "Key Close Drivers", trendLabel: "Close Progress Trend", gaugeLabel: "Close Readiness", gaugeValue: 64 },
      specialists: [
        { name: 'Financial Close Specialist', task: 'Checking close activities' },
        { name: 'Reconciliation Specialist', task: 'Reviewing exception status' },
        { name: 'Capital Specialist', task: 'Reviewing capitalisation postings' },
        { name: 'Board Reporting Specialist', task: 'Drafting close commentary' },
      ],
    },
  },
  {
    id: 'reconciliation',
    keywords: ['recon', 'reconciliation', 'bank statement', ' gl ', 'unmatched', 'exceptions', 'vendor recon', 'matching'],
    response: {
      id: 'reconciliation',
      label: 'Reconciliation',
      situation: 'Manual reconciliation across bank, GL, AR and AP is time-intensive, and exceptions typically surface only after they have aged.',
      evidence: [
        'Bank-to-GL matching is largely manual today',
        'A recurring pattern of duplicate vendor payments has been raised as a concern',
        'bank and cashbook reconciliations need a consistent mapping to GL suspense',
      ],
      reasoningSummary: "Most exceptions cluster around duplicate payment risk and bank-to-GL timing — both addressable with tighter matching rules rather than a wider process overhaul.",
      recommendation: 'Pilot an exceptions-only reconciliation view across bank, GL, AR and AP for one month of transactions.',
      decisionRequired: 'Confirm the business unit and month to use for the reconciliation pilot.',
      actions: [
        'Extract one month of bank, GL, AR and AP data for the pilot',
        'Agree exception categories and severity thresholds with Financial Accounting',
        'Review the top exceptions with the relevant process owners',
      ],
      dataRequired: ['Bank statement extract', 'GL extract', 'AR and AP extracts'],
      businessImpact: "Reducing manual reconciliation effort frees Financial Accounting capacity for higher-value review work each month.",
      confidence: 'Medium — directional, pending a full month of source data',
      confidenceScore: 60,
      chartData: { drivers: [{ label: "Bank-to-GL Matching", value: 68 }, { label: "Duplicate Payment Risk", value: 72 }, { label: "FX Suspense Mapping", value: 45 }, { label: "Exception Ageing", value: 58 }], trend: [25, 30, 38, 44, 50, 55, 58, 60], driversLabel: "Exception Categories", trendLabel: "Exception Ageing Trend", gaugeLabel: "Match Rate", gaugeValue: 88 },
      specialists: [
        { name: 'Reconciliation Specialist', task: 'Reviewing exception status' },
        { name: 'Financial Close Specialist', task: 'Cross-checking GL postings' },
        { name: 'Working Capital Specialist', task: 'Checking AR / AP matching' },
      ],
    },
  },
  {
    id: 'capital-management',
    keywords: ['payment', 'payments', 'automation', 'python', 'bulk payment', 'ap processing', 'payment sheet'],
    response: {
      id: 'capital-management',
      label: 'Capital Management',
      situation: 'Payment automation readiness should be reviewed against the remaining Python conversion and SI report dependencies.',
      evidence: [
        'Payment automation dependencies remain open before controlled production use',
        'Depreciation start dates are set against planned store and banking readiness, not actual',
        'Capitalisation postings on a small number of projects need a baseline check',
      ],
      reasoningSummary: "The automation build is substantially progressed, but remaining technical dependencies prevent controlled production use.",
      recommendation: 'Confirm accountable owners and completion dates for Python conversion, SI report installation and production validation.',
      decisionRequired: 'Confirm the production owner and target date for the payment automation release.',
      actions: [
        'Compare planned versus actual store and banking readiness dates for flagged projects',
        'Hold capitalisation postings pending a project cost baseline check',
        'Model the operational impact of delayed automation deployment',
      ],
      dataRequired: ['store and campaign cost reports', 'Asset register extract', 'store campaign and billing schedule'],
      businessImpact: "Closing the remaining dependencies protects payment continuity and unlocks the intended manual-effort reduction.",
      confidence: 'Low-Medium — indicative only, pending Capital Accounting validation',
      confidenceScore: 45,
      chartData: { drivers: [{ label: "Spend Pacing vs Revenue", value: 78 }, { label: "Depreciation Timing", value: 55 }, { label: "Capitalisation Baseline", value: 40 }, { label: "Project Risk", value: 33 }], trend: [20, 26, 33, 40, 46, 50, 48, 45], driversLabel: "Capital Drivers", trendLabel: "Capitalisation Trend", gaugeLabel: "Capitalisation Readiness", gaugeValue: 52 },
      specialists: [
        { name: 'Capital Specialist', task: 'Reviewing project cost baseline' },
        { name: 'Financial Close Specialist', task: 'Checking capitalisation postings' },
      ],
    },
  },
  {
    id: 'revenue-assurance',
    keywords: ['revenue', 'leakage', 'billing', 'assurance', 'provisioning', 'amdocs', 'fam', 'wholesale'],
    response: {
      id: 'revenue-assurance',
      label: 'Revenue Assurance',
      situation: 'Billing integrity on recent tariff migrations shows early indications of under-billing in a subset of regions.',
      evidence: [
        'Rate-plan migrations from legacy to enterprise tariffs show billing indications worth investigating',
        'A subset of regions accounts for the majority of the flagged accounts',
        'Provisioning-to-billing mapping has not been independently checked since the migration',
      ],
      reasoningSummary: "The billing indication is concentrated in a small number of regions following the same migration wave, which narrows the audit scope considerably.",
      recommendation: 'Commission a tariff-mapping audit on the affected fleet and campaign payment allocation before the next billing cycle.',
      decisionRequired: 'Confirm Revenue Assurance as the business owner for the audit.',
      actions: [
        'Pull a sample of migrated accounts across the affected regions',
        'Validate the tariff mapping against the provisioning system',
        'Quantify the potential billing variance once the sample is validated',
      ],
      dataRequired: ['Billing extract for migrated accounts', 'Tariff mapping table', 'Provisioning system extract'],
      businessImpact: "Confirming and correcting the tariff mapping closes a recurring billing gap before it compounds across future cycles.",
      confidence: 'Medium — directional, pending a validated account sample',
      confidenceScore: 52,
      chartData: { drivers: [{ label: "Tariff Mapping Risk", value: 74 }, { label: "Regional Concentration", value: 62 }, { label: "Provisioning Alignment", value: 40 }, { label: "Billing Sample Coverage", value: 35 }], trend: [18, 24, 30, 38, 44, 48, 50, 52], driversLabel: "Leakage Risk Drivers", trendLabel: "Billing Exception Trend", gaugeLabel: "Leakage Risk", gaugeValue: 48 },
      specialists: [
        { name: 'Revenue Assurance Specialist', task: 'Reviewing tariff mapping' },
        { name: 'Working Capital Specialist', task: 'Checking billing-to-collections impact' },
      ],
    },
  },
  {
    id: 'procurement',
    keywords: ['supplier', 'vendor', 'procurement', 'ariba', 'spend', 'contract', 'purchase order', 'rfp'],
    response: {
      id: 'procurement',
      label: 'Procurement / Supplier',
      situation: 'Supplier concentration on select supplier payments contracts introduces both currency and delivery risk to near-term cash planning.',
      evidence: [
        'A small number of suppliers account for a large share of equipment-related spend',
        'Payment terms on select contracts should be reviewed alongside store banking exposure',
        'Purchase order timing affects both capital pacing and short-term cash planning',
      ],
      reasoningSummary: "Supplier concentration and deposit and allocation exposure move together on the largest equipment contracts, so they should be reviewed as one risk, not two.",
      recommendation: 'Review supplier concentration and currency terms on the largest equipment contracts alongside the store banking exposure view.',
      decisionRequired: 'Confirm whether Procurement should co-own a combined supplier-risk and cash-impact review.',
      actions: [
        'List the top equipment suppliers by committed spend and deposit and allocation exposure',
        'Cross-check purchase order timing against the capital spend plan',
        'Flag any contracts without current banking confirmation for Cashbooks review',
      ],
      dataRequired: ['Supplier spend report (Supplier & payment files)', 'Purchase order schedule', 'Contract currency terms'],
      businessImpact: "Reducing concentration or improving banking confirmation on top suppliers lowers both delivery and currency risk to the capital programme.",
      confidence: 'Low-Medium — indicative only, pending Procurement data validation',
      confidenceScore: 42,
      chartData: { drivers: [{ label: "Supplier Concentration", value: 70 }, { label: "Currency Term Exposure", value: 58 }, { label: "PO Timing vs Capital Plan", value: 45 }, { label: "Hedge Cover Gaps", value: 30 }], trend: [15, 20, 26, 32, 37, 40, 42, 42], driversLabel: "Supplier Risk Drivers", trendLabel: "Spend Concentration Trend", gaugeLabel: "Payment Exposure", gaugeValue: 40 },
      specialists: [
        { name: 'Cashbooks & Banking Specialist', task: 'Cross-checking deposit and allocation exposure' },
        { name: 'Capital Specialist', task: 'Checking purchase order timing' },
      ],
    },
  },
  {
    id: 'board-reporting',
    keywords: ['board', 'exco', 'summary', 'report', 'commentary', 'pack', 'executive summary'],
    response: {
      id: 'board-reporting',
      label: 'Board Reporting',
      situation: 'This quarter\u2019s board narrative can be assembled from the same inputs used for the working capital, close and cashbook views, drafted for editorial review.',
      evidence: [
        'Working capital and close indicators are the two areas most likely to warrant board attention this cycle',
        'A draft narrative can be produced ahead of the usual manual compilation timeline',
        'Editorial review by TiAuto Finance Management remains required before circulation',
      ],
      reasoningSummary: "Working Capital and Close commentary are the most complete inputs available; the Risk section still needs manual input before the draft is board-ready.",
      recommendation: 'Generate a draft board narrative from the current finance indicators for TiAuto Finance Management to edit and validate.',
      decisionRequired: 'Confirm whether TiAuto Finance Management would like a draft narrative generated for the next board cycle.',
      actions: [
        'Generate a draft executive summary from the current briefing sections',
        'Route the draft to TiAuto Finance Management for editorial review',
        'Confirm the board pack submission deadline for this cycle',
      ],
      dataRequired: ['Consolidated finance pack', 'Prior board reports', 'EXCO commentary'],
      businessImpact: "A drafted narrative removes the majority of manual compilation time from the board pack production cycle.",
      confidence: 'Medium — draft only, requires TiAuto Finance Management sign-off',
      confidenceScore: 66,
      chartData: { drivers: [{ label: "Working Capital Commentary", value: 80 }, { label: "Close Commentary", value: 65 }, { label: "Risk Section Readiness", value: 55 }, { label: "Executive Summary Draft", value: 70 }], trend: [40, 45, 50, 55, 60, 63, 65, 66], driversLabel: "Commentary Readiness Drivers", trendLabel: "Reporting Pack Progress", gaugeLabel: "Pack Readiness", gaugeValue: 70 },
      specialists: [
        { name: 'Board Reporting Specialist', task: 'Drafting executive summary' },
        { name: 'Working Capital Specialist', task: 'Supplying working capital commentary' },
        { name: 'Financial Close Specialist', task: 'Supplying close commentary' },
      ],
    },
  },
];

export const fallbackResponse = 'Please select the finance area you want to investigate: Working Capital, Cash, Close, Reconciliations, Capital, Revenue Assurance or Procurement.';

export function matchIntent(question: string): AskIntentResponse | null {
  const q = ` ${question.toLowerCase()} `;
  let best: { intent: AskIntent; score: number } | null = null;
  for (const intent of askIntents) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (q.includes(kw.toLowerCase())) score += kw.trim().length;
    }
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }
  return best ? best.intent.response : null;
}

export const presetQuestions = [
  'Why is working capital under pressure?',
  'What could delay month-end close?',
  'Which reconciliations need attention?',
  'What data is required for a working capital pilot?',
  'Prepare an executive board summary',
  'Where could supplier risk impact cash?',
];
