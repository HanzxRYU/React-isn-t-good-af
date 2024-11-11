export default function StyledComponent() {
  const customStyle = {
    color: "blue",
    fontSize: "20px",
    border: "1px solid black",
    padding: "10px",
    borderRadius: "5px",
  };

  return (
    <div style={customStyle}>
      <h1>Hello, styled world!</h1>
    </div>
  );
}
