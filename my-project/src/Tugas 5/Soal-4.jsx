import React from "react";

function Greeting({ time = 5 }) {
  let message;

  if (time >= 5 && time <= 11) {
    message = "Good Morning!";
  } else if (time >= 12 && time <= 17) {
    message = "Good Afternoon!";
  } else if (time >= 18 && time <= 20) {
    message = "Good Evening!";
  } else {
    message = "Good Night!";
  }

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default Greeting;
