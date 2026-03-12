import "./App.css";
import { useState } from "react";
import { Footer } from "./helper";
const arr = ["✌️", "👊", "🤚"];
const ran = () => Math.trunc(Math.random() * arr.length);
const Header = function () {
  return (
    <div className="heading">
      <h1>{"rock paper scissor".toUpperCase()}</h1>
      <p>Description</p>
    </div>
  );
};
const Score = function ({ playerScore, AiScore }) {
  return (
    <div className="score">
      <span>player:{playerScore}</span>
      <span>AI:{AiScore}</span>
    </div>
  );
};
const Play = function ({ emoji, random }) {
  return (
    <div className="play">
      <section>
        <span>{emoji}</span>
      </section>
      <section>
        <span>{random}</span>
      </section>
    </div>
  );
};
const Buttons = function ({ fun }) {
  return (
    <div className="btns">
      {arr.map((e) => (
        <button onClick={fun}>{e}</button>
      ))}
    </div>
  );
};
function App() {
  let [status, SetStatus] = useState("");
  let [ranEmoji, Setemoji] = useState("");
  let [playerScore, setPlayerScore] = useState(0);
  let [AiScore, setAiScore] = useState(0);
  let setScore = () => {
    if (status === "✌️" && ranEmoji === "🤚") {
      setPlayerScore(playerScore + 1);
    } else if (status === "👊" && ranEmoji === "✌️") {
      setPlayerScore(playerScore + 1);
    } else if (status === "🤚" && ranEmoji === "👊") {
      setPlayerScore(playerScore + 1);
    } else if (status === ranEmoji) {
      setAiScore(AiScore + 0);
      setPlayerScore(playerScore + 0);
    } else {
      setAiScore(AiScore + 1);
    }
  };
  let update = (e) => {
    SetStatus(e.target.textContent);
    Setemoji(arr[ran()]);
    console.log(ranEmoji);
    setScore();
  };
  const reset = () => {
    SetStatus("");
    setPlayerScore(0);
    Setemoji("");
    setAiScore(0);
  };
  ///////////
  return (
    <section className="box">
      <Header></Header>
      <Score playerScore={playerScore} AiScore={AiScore}></Score>
      <Play emoji={status} random={ranEmoji}></Play>
      <Buttons fun={update}></Buttons>
      <Footer reset={reset}></Footer>
    </section>
  );
}

export default App;
