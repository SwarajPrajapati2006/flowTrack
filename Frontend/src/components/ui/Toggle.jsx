export default function Toggle({ checked, onChange }) {
  return (
    <label className="toggle-wrap">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle-track" />
      <span className="toggle-thumb" />
    </label>
  );
}
