import { useState } from 'react';
import { user, sessions } from '../data/dummy';
import Toggle from '../components/ui/Toggle';

export default function Settings() {
  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [currency, setCurrency] = useState('INR (₹) — Indian Rupee');
  const [language, setLanguage] = useState('English (India)');
  const [theme, setTheme] = useState('Dark');
  const [twoFA, setTwoFA] = useState(false);
  const [notifTx, setNotifTx] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(true);
  const [notifRenew, setNotifRenew] = useState(false);

  const selectStyle = {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    padding: '10px 14px',
    outline: 'none',
    width: '100%',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '35% 62%', gap: '24px' }}>
      {/* LEFT COLUMN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Profile Card */}
        <div className="card anim-fade-up delay-0" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '18px', marginBottom: '20px' }}>Profile</h2>

          {/* Avatar */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '24px',
                  color: '#003828',
                }}
              >
                {user.avatar}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--card-high)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Name & ID */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '18px' }}>{user.name}</div>
            <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '2px' }}>{user.id}</div>
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="label-text">Full Name</label>
              <input className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <label className="label-text">Email Address</label>
              <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label-text">Phone Number</label>
              <input className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%', height: '42px', fontSize: '14px', marginTop: '20px' }}>
            Save Profile
          </button>
        </div>

        {/* Plan Card */}
        <div className="card anim-fade-up delay-1" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '18px' }}>Plan</h2>
            <span className="badge badge-green">ACTIVE</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px', marginBottom: '4px' }}>
            {user.plan}
          </div>
          <div style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '20px' }}>
            Billed annually. Next cycle in 84 days.
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-ghost" style={{ flex: 1, height: '38px', fontSize: '13px' }}>Manage</button>
            <button className="btn-ghost" style={{ flex: 1, height: '38px', fontSize: '13px', borderColor: 'var(--green)', color: 'var(--green)' }}>Upgrade</button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Preferences */}
        <div className="card anim-fade-up delay-1" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '18px', marginBottom: '20px' }}>Preferences</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="label-text">Base Currency</label>
              <select style={selectStyle} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option>INR (₹) — Indian Rupee</option>
                <option>USD ($) — US Dollar</option>
                <option>EUR (€) — Euro</option>
              </select>
            </div>
            <div>
              <label className="label-text">Language</label>
              <select style={selectStyle} value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>English (India)</option>
                <option>Hindi</option>
                <option>English (US)</option>
              </select>
            </div>
          </div>

          <div style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '12px' }}>
            All dashboard metrics will use this currency.
          </div>

          {/* Theme Toggle */}
          <div style={{ marginTop: '20px' }}>
            <label className="label-text">Interface Theme</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              {['Light', 'Dark', 'System'].map((t) => (
                <button
                  key={t}
                  className={theme === t ? 'btn-primary' : 'btn-ghost'}
                  style={{ flex: 1, height: '36px', fontSize: '13px' }}
                  onClick={() => setTheme(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="card anim-fade-up delay-2" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '18px', marginBottom: '20px' }}>Account Security</h2>

          {/* Password */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Password</div>
              <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '2px' }}>Last changed 4 months ago</div>
            </div>
            <button className="btn-ghost" style={{ height: '34px', padding: '0 14px', fontSize: '12px' }}>Change Password</button>
          </div>

          {/* 2FA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Two-Factor Authentication</div>
              <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '2px' }}>Add an extra layer of security to your account.</div>
            </div>
            <Toggle checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} />
          </div>

          {/* Active Sessions */}
          <div style={{ paddingTop: '16px' }}>
            <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '12px' }}>Active Sessions</div>
            <div
              className="tbl-head"
              style={{ gridTemplateColumns: '1fr 1fr 100px' }}
            >
              <span>Device</span>
              <span>Location</span>
              <span style={{ textAlign: 'right' }}>Status</span>
            </div>
            {sessions.map((s, i) => (
              <div
                key={i}
                className="tbl-row"
                style={{ gridTemplateColumns: '1fr 1fr 100px' }}
              >
                <span style={{ fontSize: '13px' }}>
                  {i === 0 ? '💻' : '📱'} {s.device}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: '13px' }}>{s.location}</span>
                <span style={{ textAlign: 'right' }}>
                  {s.status === 'CURRENT' ? (
                    <span style={{ color: s.statusColor, fontSize: '12px', fontWeight: 600 }}>CURRENT</span>
                  ) : (
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: s.statusColor,
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      REVOKE
                    </button>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card anim-fade-up delay-3" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '18px', marginBottom: '20px' }}>Notification Settings</h2>

          {/* Notification Rows */}
          {[
            {
              title: 'New Transaction Alerts',
              desc: 'Get notified for every inflow or outflow.',
              checked: notifTx,
              onChange: (e) => setNotifTx(e.target.checked),
            },
            {
              title: 'Weekly Report',
              desc: 'A summary of your spending and income every Sunday.',
              checked: notifWeekly,
              onChange: (e) => setNotifWeekly(e.target.checked),
            },
            {
              title: 'Subscription Renewal Reminders',
              desc: 'Alert 3 days before any tracked subscription renews.',
              checked: notifRenew,
              onChange: (e) => setNotifRenew(e.target.checked),
            },
          ].map((item, i, arr) => (
            <div
              key={item.title}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.title}</div>
                <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '2px' }}>{item.desc}</div>
              </div>
              <Toggle checked={item.checked} onChange={item.onChange} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
