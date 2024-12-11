import { StartButton } from "./components/start-button";
import { Game } from "./components/game";
import { useState } from "react";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app">
      {!started && <StartButton onClick={() => setStarted(true)} />}
      {started && <Game />}
    </div>
  );
}

export default App;
