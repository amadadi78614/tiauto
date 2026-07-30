import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import ConfidenceGauge from './ConfidenceGauge';
import type { IntentChartData } from '../data/askIntents';

interface InsightVisualsProps {
  data: IntentChartData;
  accent?: string;
}

export default function InsightVisuals({ data, accent = '#38BDF8' }: InsightVisualsProps) {
  const barData = data.drivers.map((d) => ({ name: d.label, value: d.value }));
  const trendData = data.trend.map((v, i) => ({ i, v }));

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-[var(--efi-ink-2)] font-medium mb-3">{data.driversLabel}</div>
          <div style={{ width: '100%', height: 168 }}>
            <ResponsiveContainer>
              <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={150}
                  tick={{ fontSize: 10.5, fill: 'var(--efi-ink-1)' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={12}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={accent} fillOpacity={1 - i * 0.16} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pt-2">
          <ConfidenceGauge score={data.gaugeValue} label={data.gaugeLabel} />
        </div>
      </div>

      <div className="mt-5">
        <div className="text-[11px] uppercase tracking-wide text-[var(--efi-ink-2)] font-medium mb-3">{data.trendLabel}</div>
        <div style={{ width: '100%', height: 120 }}>
          <ResponsiveContainer>
            <LineChart data={trendData} margin={{ top: 8, right: 10, bottom: 0, left: 0 }}>
              <Line type="monotone" dataKey="v" stroke={accent} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="text-[10.5px] text-[var(--efi-ink-2)] mt-1">Illustrative values for demonstration only</div>
      </div>
    </div>
  );
}
