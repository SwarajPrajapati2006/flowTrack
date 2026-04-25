import { useMemo } from 'react';

export default function DonutChart({ data, size = 200, strokeWidth = 22 }) {
  const radius = (size / 2) - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const segments = useMemo(() => {
    let offset = 0;
    return data.map((d, i) => {
      const fraction = d.value / total;
      const dashArray = circumference * fraction;
      const dashOffset = -offset;
      offset += dashArray;
      return {
        ...d,
        dashArray: `${dashArray} ${circumference - dashArray}`,
        dashOffset,
        delay: i * 0.12,
      };
    });
  }, [data, total, circumference]);

  const topCategory = data.reduce((a, b) => a.value > b.value ? a : b, data[0]);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background ring */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="var(--card-high)"
          strokeWidth={strokeWidth}
        />
        {/* Data segments */}
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={seg.dashArray}
            strokeDashoffset={seg.dashOffset}
            strokeLinecap="round"
            style={{
              opacity: 0,
              animation: `fadeIn 0.6s ease ${seg.delay}s forwards`,
            }}
          />
        ))}
      </svg>
      {/* Center text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Top Category
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', marginTop: '2px' }}>
          {topCategory.name}
        </div>
      </div>
    </div>
  );
}
