import React from "react";

function Notification({ priority = "low" }) {
  let message;
  switch (priority) {
    case "low":
      message = "No immediate action required.";
      break;
    case "medium":
      message = "please address this as soon as possible.";
      break;
    case "high":
      message = "Immediate action required!";
      break;
    default:
      message = "Invalid status.";
  }

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
