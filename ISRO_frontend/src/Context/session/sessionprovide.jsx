import React, { useEffect, useState } from "react";
import { sessioncontext } from "./sessioncontext";
export function SessionProvider({ children }) {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("GeoNLI_Sessions"));
    if (saved) setSessions(saved);
  }, []);
  useEffect(() => {
  if (sessions.length > 0) {
    localStorage.setItem("GeoNLI_Sessions", JSON.stringify(sessions));
  }
}, [sessions]);
  return (
    <sessioncontext.Provider
      value={{
        sessions,
        setSessions,
        activeSessionId,
        setActiveSessionId,
      }}
    >
      {children}
    </sessioncontext.Provider>
  );
}
