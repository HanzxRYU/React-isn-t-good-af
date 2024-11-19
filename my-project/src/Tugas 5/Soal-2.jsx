import React from "react";

function DeliveryStatus({ status = "processing" }) {
  let message;
  switch (status) {
    case "processing":
      message = "Your order is being processed.";
      break;
    case "shipped":
      message = "Your order has been shipped.";
      break;
    case "delivered":
      message = "Your order has been delivered!";
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

export default DeliveryStatus;
