import "./InputArea.css";

const InputArea = ({ name, id, value, defaultValue, onChange }) => {
  return (
    <textarea
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
    ></textarea>
  );
};

export default InputArea;
