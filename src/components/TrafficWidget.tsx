import { Navigation } from 'lucide-react';

interface TrafficWidgetProps {
  route?: string;
  minutes?: number;
  level?: 'light' | 'moderate' | 'heavy';
}

const levelMeta = {
  light: { label: 'Light traffic', color: '#10B981', segments: 1 },
  moderate: { label: 'Moderate traffic', color: '#FACC15', segments: 2 },
  heavy: { label: 'Heavy traffic', color: '#FB7185', segments: 3 },
};

export default function TrafficWidget({ route = 'TiAuto Finance → Executive Decision Centre', minutes = 24, level = 'moderate' }: TrafficWidgetProps) {
  const meta = levelMeta[level];

  return (
    <div className="flex items-center gap-2.5 text-[13px] font-medium">
      <Navigation size={16} className="text-[var(--efi-ink-2)] shrink-0" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[var(--efi-ink-0)]">{route}</span>
          <span className="font-mono text-[12px]" style={{ color: meta.color }}>{minutes} min</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-5 h-1.5 rounded-full"
                style={{ background: i < meta.segments ? meta.color : 'rgba(255,255,255,0.1)' }}
              />
            ))}
          </div>
          <span className="text-[10.5px] font-mono text-[var(--efi-ink-2)]">{meta.label} · illustrative</span>
        </div>
      </div>
    </div>
  );
}
