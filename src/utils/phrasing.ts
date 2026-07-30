// Small rotation of human presenter-style lead-ins for each response section.
// Picked deterministically per response id so the variety feels intentional
// rather than random flicker on re-render, but varies across different questions.

const leadIns = {
  situation: [
    "Here's what stands out:",
    "First, the picture on the ground:",
    "Let's start with where things stand:",
    'Quick read on the situation:',
  ],
  evidence: [
    'A few things point to this:',
    "Here's what the specialists found:",
    'The evidence, in short:',
    'What backs this up:',
  ],
  recommendation: [
    'Here\u2019s the call:',
    'Our recommendation:',
    'What we\u2019d do next:',
    'The suggested move:',
  ],
  decision: [
    'Over to you on:',
    'The decision this needs:',
    'One thing to confirm:',
    'What we need from you:',
  ],
};

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function pickLeadIn(section: keyof typeof leadIns, seed: string): string {
  const options = leadIns[section];
  const idx = hashString(seed + section) % options.length;
  return options[idx];
}
