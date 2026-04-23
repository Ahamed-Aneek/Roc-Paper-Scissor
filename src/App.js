import "./App.css";
import { useState } from "react";
import { Footer } from "./helper";

const arr = ["✌️", "👊", "🤚"];
const ran = () => Math.trunc(Math.random() * arr.length);

/* ── Header ── */
const Header = function () {
  return (
    <div className="heading">
      <h1>{"rock paper scissor".toUpperCase()}</h1>
      <p>Choose your move and beat the AI!</p>
    </div>
  );
};

/* ── Score board ── */
const Score = function ({ playerScore, AiScore }) {
  return (
    <div className="score">
      <div className="score-card player">
        <span className="score-label">You</span>
        <span className="score-value">{playerScore}</span>
      </div>
      <div className="score-divider">VS</div>
      <div className="score-card ai">
        <span className="score-label">AI</span>
        <span className="score-value">{AiScore}</span>
      </div>
    </div>
  );
};

/* ── Result banner ── */
const ResultBanner = function ({ result }) {
  const messages = {
    win:  "🎉 You Win!",
    lose: "😔 AI Wins!",
    draw: "🤝 It's a Draw!",
    idle: "Pick a move to start!",
  };
  return (
    <div className={`result-banner ${result}`}>
      {messages[result]}
    </div>
  );
};

/* ── Play area ── */
const Play = function ({ emoji, random }) {
  return (
    <div className="play">
      <div className="play-side player">
        <span className="play-label">You</span>
        <section className={emoji ? "" : "empty"}>
          {emoji && <span className="emoji">{emoji}</span>}
        </section>
      </div>
      <div className="vs-divider">VS</div>
      <div className="play-side ai">
        <span className="play-label">AI</span>
        <section className={random ? "" : "empty"}>
          {random && <span className="emoji">{random}</span>}
        </section>
      </div>
    </div>
  );
};

/* ── Buttons ── */
const Buttons = function ({ fun }) {
  return (
    <div className="btns">
      {arr.map((e) => (
        <button key={e} onClick={fun}>{e}</button>
      ))}
    </div>
  );
};

/* ── Determine result ── */
const getResult = (player, ai) => {
  if (!player || !ai) return "idle";
  if (player === ai) return "draw";
  if (
    (player === "✌️" && ai === "🤚") ||
    (player === "👊" && ai === "✌️") ||
    (player === "🤚" && ai === "👊")
  ) return "win";
  return "lose";
};

/* ── App ── */
function App() {
  const [status, SetStatus] = useState("");
  const [ranEmoji, Setemoji] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [AiScore, setAiScore] = useState(0);

  const result = getResult(status, ranEmoji);

  const update = (e) => {
    const playerPick = e.target.textContent;
    const aiPick = arr[ran()];
    SetStatus(playerPick);
    Setemoji(aiPick);

    const r = getResult(playerPick, aiPick);
    if (r === "win")  setPlayerScore((s) => s + 1);
    if (r === "lose") setAiScore((s) => s + 1);
  };

  const reset = () => {
    SetStatus("");
    setPlayerScore(0);
    Setemoji("");
    setAiScore(0);
  };

  return (
    <section className="box">
      <Header />
      <Score playerScore={playerScore} AiScore={AiScore} />
      <ResultBanner result={result} />
      <Play emoji={status} random={ranEmoji} />
      <Buttons fun={update} />
      <Footer reset={reset} />
    </section>
  );
}

export default App;
