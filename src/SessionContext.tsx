import React, { createContext, useState, ReactNode } from "react";

interface Session {
  logged: boolean;
}

interface SessionContextType {
  session: Session;
  setSession: (session: Session) => void;
}

export const SessionContext = createContext<SessionContextType>({
  session: { logged: false },
  setSession: () => {},
});

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session>({ logged: false });

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};
