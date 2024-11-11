import React, { useContext } from "react";
import "./App.css";
import Header from "./Header";
import { SessionContext } from "./SessionContext";

const App: React.FC = () => {
  const { session } = useContext(SessionContext);

  return (
    <div className="App">
      <Header session={session} />
      <h1>Bem-vindo à Página Inicial</h1>
      <p>Este é o conteúdo da rota "/".</p>
    </div>
  );
};

export default App;
