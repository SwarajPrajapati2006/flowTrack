import { subscriptions, recurringStats } from '../data/dummy';
import { formatINR } from '../utils/format';

export default function Recurring() {
  return (
    <div>
      {/* Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '68fr 32fr', gap: '20px' }}>
        {/* Left card */}
        <div className="card anim-fade-up delay-0" style={{ padding: '24px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="label-text" style={{ marginBottom: 0 }}>TOTAL MONTHLY COMMITMENT</span>
            <button className="btn-primary" style={{ height: '34px', padding: '0 16px', fontSize: '12px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add New
            </button>
          </div>
          <div
            className="currency-display anim-number"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '56px',
              marginBottom: '24px',
            }}
          >
            {formatINR(recurringStats.totalMonthly)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0' }}>
            <div style={{ paddingRight: '24px' }}>
              <div className="label-text">Active Subs</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px' }}>
                {recurringStats.activeSubs}
              </div>
            </div>
            <div style={{ paddingLeft: '24px', paddingRight: '24px', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
              <div className="label-text">Upcoming (7 Days)</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px', color: 'var(--orange)' }}>
                {recurringStats.upcoming7days}
              </div>
            </div>
            <div style={{ paddingLeft: '24px' }}>
              <div className="label-text">Yearly Projection</div>
              <div className="currency-display" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px' }}>
                {formatINR(recurringStats.yearlyProjection)}
              </div>
            </div>
          </div>
        </div>

        {/* Right card - Optimization Score */}
        <div className="card anim-fade-up delay-1" style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--card-high)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
              <polyline points="17,6 23,6 23,12" />
            </svg>
          </div>
          <div style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '4px' }}>Optimization Score</div>
          <div
            className="currency-display anim-number delay-2"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: 'var(--green)', marginBottom: '8px' }}
          >
            {recurringStats.optimizationScore}%
          </div>
          <div style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
            Looking lean. No unused subscriptions detected.
          </div>
        </div>
      </div>

      {/* Active Subscriptions */}
      <div style={{ marginTop: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px' }}>Active Subscriptions</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-ghost" style={{ height: '34px', padding: '0 14px', fontSize: '12px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
              </svg>
              Filter
            </button>
            <button className="btn-ghost" style={{ height: '34px', padding: '0 14px', fontSize: '12px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="6" y1="12" x2="18" y2="12" />
                <line x1="8" y1="18" x2="16" y2="18" />
              </svg>
              Sort
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {subscriptions.map((sub, i) => (
            <div
              key={sub.id}
              className={`card anim-fade-up delay-${i}`}
              style={{ padding: '20px', position: 'relative' }}
            >
              {/* Top Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div
                  style={{
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <img src={sub.logo} alt={sub.name} style={{ height: '100%', objectFit: 'contain' }} />
                </div>
                {sub.status === 'renewing' ? (
                  <span className="badge badge-orange renew-pulse">
                    RENEWS IN {sub.renewIn} DAYS
                  </span>
                ) : (
                  <span className="badge badge-green">ACTIVE</span>
                )}
              </div>

              {/* Service Info */}
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', marginTop: '16px' }}>
                {sub.name}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '2px' }}>
                {sub.plan}
              </div>

              {/* Separator */}
              <div style={{ borderTop: '1px solid var(--border)', margin: '16px 0' }} />

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ color: 'var(--muted)', fontFamily: 'var(--font-display)', fontSize: '14px' }}>₹</span>
                <span className="currency-display" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '28px' }}>
                  {sub.amount.toLocaleString('en-IN')}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: '14px' }}>/mo</span>
              </div>

              {/* Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h18" />
                </svg>
                <span style={{ color: 'var(--muted)', fontSize: '13px' }}>{sub.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
