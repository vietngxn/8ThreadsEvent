export default function Input({ value, onChange, placeholder, type="text" }) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="input"
    />
  );
}