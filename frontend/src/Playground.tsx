import "./App.css";
import React, { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/books/Books";

type Props = {
  token: string;
};

const App: React.FC<Props> = ({ token }) => {
  const [authors, setAuthors] = useState<any[]>([]);

  return (
    <div className="App">
      user auth token: {token}
      <Authors token={token} authors={authors} onSetAuthors={setAuthors} />
      <Books token={token} authors={authors} />
    </div>
  );
};

export default App;
