import "./style.css";

export const Switch = () => {
  return (
    <div>
      <input type="checkbox" className="checkbox" onChange={toggleTheme} />
    </div>
  );
};
