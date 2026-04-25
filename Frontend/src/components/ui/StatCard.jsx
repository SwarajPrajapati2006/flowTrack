import { formatINR } from '../../utils/format';

export default function StatCard({ label, amount, icon, color, delay = 0 }) {
  return (
    <div className={`card anim-fade-up delay-${delay}`} style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="label-text" style={{ marginBottom: 0 }}>{label}</span>
        {icon}
      </div>
      <div
        className={`currency-display anim-number delay-${delay}`}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '36px',
          color: color || 'var(--text)',
        }}
      >
        {formatINR(Math.abs(amount))}
      </div>
    </div>
  );
}
