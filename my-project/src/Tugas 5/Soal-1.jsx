import React from "react";

function WelcomeMessage({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome back, user!</p>
      ) : (
        <p>Please log in to continue.</p>
      )}
    </div>
  );
}

export default WelcomeMessage;
