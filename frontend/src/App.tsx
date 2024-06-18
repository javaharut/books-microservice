import "./App.css";
import React, { useState } from "react";
import Login from "./Login";
import Playground from "./Playground";

const App: React.FC = () => {
  const [token, setToken] = useState<string>("");

  const handleSetToken = (token: string) => {
    setToken(token);
  };

  return (
    <div className="App">
      {!token ? <Login onSetToken={handleSetToken} /> : <Playground token={token} />}
    </div>
  );
};

export default App;
