import { useState, useEffect } from "react";

// Custom hook
export function useOnlineStatus() {
  const [state, setState] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setState(true);
    }
    function handleOffline() {
      setState(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return state;
}

// Komponen yang menggunakan custom hook
export function StatusBar() {
  const isOnline = useOnlineStatus(); // Custom hook dipanggil tanpa argumen
  return <h1>{isOnline ? "Online" : "Offline"}</h1>;
}
