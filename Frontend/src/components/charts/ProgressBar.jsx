import { useState, useEffect } from 'react';

export default function ProgressBar({ percent = 0, color = 'var(--green)', height = 4, delay = 0 }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percent), 100 + delay);
    return () => clearTimeout(timer);
  }, [percent, delay]);

  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`,
        background: 'var(--card-high)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${width}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color}, var(--green-dim))`,
          borderRadius: '2px',
          transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
    </div>
  );
}
