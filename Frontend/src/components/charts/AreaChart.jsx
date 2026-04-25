import { useRef, useEffect, useState, useMemo } from 'react';
import { formatINRShort } from '../../utils/format';

export default function AreaChart({ data, width = 700, height = 280 }) {
  const incomeRef = useRef(null);
  const expenseRef = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxVal = useMemo(() => Math.max(...data.map(d => Math.max(d.income, d.expenses))), [data]);

  const scaleX = (i) => padding.left + (i / (data.length - 1)) * chartW;
  const scaleY = (v) => padding.top + chartH - (v / maxVal) * chartH;

  const buildPath = (key) => {
    const points = data.map((d, i) => ({ x: scaleX(i), y: scaleY(d[key]) }));
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
      const cpx2 = curr.x - (curr.x - prev.x) * 0.4;
      path += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return path;
  };

  const buildAreaPath = (key) => {
    const line = buildPath(key);
    const lastX = scaleX(data.length - 1);
    const firstX = scaleX(0);
    const bottomY = padding.top + chartH;
    return `${line} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  useEffect(() => {
    const animate = (ref) => {
      if (!ref.current) return;
      const len = ref.current.getTotalLength();
      ref.current.style.strokeDasharray = `${len}`;
      ref.current.style.strokeDashoffset = `${len}`;
      ref.current.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)';
      requestAnimationFrame(() => {
        ref.current.style.strokeDashoffset = '0';
      });
    };
    animate(incomeRef);
    animate(expenseRef);
    setTimeout(() => setDrawn(true), 100);
  }, []);

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({
    value: maxVal * f,
    y: scaleY(maxVal * f),
  }));

  const handleMouseMove = (e) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const idx = Math.round(((mx - padding.left) / chartW) * (data.length - 1));
    if (idx >= 0 && idx < data.length) {
      setTooltip({ x: scaleX(idx), y: 40, data: data[idx] });
    }
  };

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTooltip(null)}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(66,229,176,0.20)" />
          <stop offset="100%" stopColor="rgba(66,229,176,0)" />
        </linearGradient>
        <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,148,103,0.15)" />
          <stop offset="100%" stopColor="rgba(255,148,103,0)" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {yTicks.map((t, i) => (
        <g key={i}>
          <line
            x1={padding.left}
            y1={t.y}
            x2={width - padding.right}
            y2={t.y}
            stroke="var(--border)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <text x={padding.left - 8} y={t.y + 4} fill="var(--muted)" fontSize="11" textAnchor="end" fontFamily="var(--font-body)">
            {formatINRShort(t.value)}
          </text>
        </g>
      ))}

      {/* Area fills */}
      <path
        d={buildAreaPath('income')}
        fill="url(#incomeGrad)"
        style={{ opacity: drawn ? 1 : 0, transition: 'opacity 0.8s ease 0.3s' }}
      />
      <path
        d={buildAreaPath('expenses')}
        fill="url(#expenseGrad)"
        style={{ opacity: drawn ? 1 : 0, transition: 'opacity 0.8s ease 0.5s' }}
      />

      {/* Lines */}
      <path ref={incomeRef} d={buildPath('income')} fill="none" stroke="#42e5b0" strokeWidth="2" strokeLinecap="round" />
      <path ref={expenseRef} d={buildPath('expenses')} fill="none" stroke="#ff9467" strokeWidth="2" strokeLinecap="round" />

      {/* X-axis labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={scaleX(i)}
          y={height - 8}
          fill="var(--muted)"
          fontSize="11"
          textAnchor="middle"
          fontFamily="var(--font-body)"
        >
          {d.month}
        </text>
      ))}

      {/* Tooltip */}
      {tooltip && (
        <g>
          <line x1={tooltip.x} y1={padding.top} x2={tooltip.x} y2={padding.top + chartH} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={tooltip.x} cy={scaleY(tooltip.data.income)} r="4" fill="#42e5b0" />
          <circle cx={tooltip.x} cy={scaleY(tooltip.data.expenses)} r="4" fill="#ff9467" />
          <foreignObject x={tooltip.x - 80} y={tooltip.y - 10} width="160" height="70">
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '11px',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>{tooltip.data.month}</div>
              <div style={{ color: '#42e5b0' }}>Income: {formatINRShort(tooltip.data.income)}</div>
              <div style={{ color: '#ff9467' }}>Expenses: {formatINRShort(tooltip.data.expenses)}</div>
            </div>
          </foreignObject>
        </g>
      )}
    </svg>
  );
}
