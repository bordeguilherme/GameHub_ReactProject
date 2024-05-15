import "./style.css";

function Input({ type, value, setValue, label }) {
  return (
    <div>
      <input
        type={type}
        value={value}
        required=""
        onChange={(e) => setValue(e.target.value)}
      />
      <label className="label">{label}</label>
    </div>
  );
}

export default Input;
