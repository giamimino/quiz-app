"use client"
import { uploadResult } from '@/actions/actions';
import Button from '../components/ui/button';
import styles from './page.module.scss';
import quizs from "@/data/quizs.json"
import { useEffect, useState } from 'react';

export default function Home() {
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(0);
  const [points, setPoints] = useState(0)
  const [isLose, setIsLose] = useState(false)
  const [answeredIndexes, setAnsweredIndexes] = useState<number[]>([]);
  const [correct, setCorrect] = useState(0);
  const [seed, setSeed] = useState("")
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    if (answeredIndexes.length === quizs.length) {
      setRandomIndex(null);
      return;
    }
    let idx;
    do {
      idx = Math.floor(Math.random() * quizs.length);
    } while (answeredIndexes.includes(idx));
    setRandomIndex(idx);
  }, [answered, answeredIndexes]);
  
  useEffect(() => {
    const sesSeed = localStorage.getItem("seed")?.split(" ") || "0 0 0".split(" ");
    if(Number(sesSeed[0]) < answered) {
      const newSeed = `${answered} ${correct} ${answered - correct}`;
      setSeed(newSeed);
      localStorage.setItem("seed", newSeed);
    }
  }, [answered, correct]);


  function handleAnswer(haveAnswered: String) {
    const audio = new Audio("/sounds/pop.mp3");
    if (localStorage.getItem("sound") === "true") {
      audio.play();
    }


    if (randomIndex === null) return;
    setAnswered(answered + 1);
    setAnsweredIndexes([...answeredIndexes, randomIndex]);
    if (haveAnswered === quizs[randomIndex].correctAnswer) {
      setPoints(points + 105);
      setTime(time + 25);
      setCorrect(correct + 1);
    } else {
      setPoints(points + 15);
      setTime(time - 15);
    }
  }
  
  const [time, setTime] = useState(15);
  useEffect(() => {
    if (time > 0 && answered < quizs.length) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if(time <= 0) {
      setIsLose(true)
    }
  }, [time, answered]);

  function handleAgain() {
    setTime(20)
    setAnswered(0)
    setAnsweredIndexes([]);
    setCorrect(0)
    setPoints(0)
    setSeed("0 0 0")
    localStorage.setItem("seed", seed)
    setIsLose(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError(null);
  const formData = new FormData(e.currentTarget);
  const result = await uploadResult(formData);
  if (result?.error) {
    setError(result.error);
  } else {
  }
}

  return (
    <div className={styles.page}>
      <div className={styles.quizSummary}>
        <div>
          <i className="ri-question-line"></i>
          <p>{String(answered).padStart(2, "0")}/{quizs.length}</p>
        </div>
        <div>{points} points</div>
        <div>
          <p>
            {String(Math.floor(time / 60)).padStart(2, "0")}:
            {String(time % 60).padStart(2, "0")}
          </p>
          <i className="ri-time-line"></i>
        </div>
      </div>
       {randomIndex !== null && (
        <>
          <h2>{quizs[randomIndex].question}</h2>
          <div className={styles.posAns}>
            {quizs[randomIndex].options.map((ans: string, idx: number) => (
              <Button key={idx} content={ans} onClick={() => handleAnswer(ans)}/>
            ))}
          </div>
        </>
      )}
      {answered === quizs.length &&
        <div className={styles.upload}>
          <h2>answered:</h2>
          <h2><i style={{color: "#42AE5A"}} className="ri-check-line"></i> correct answers: {correct}</h2>
          <h2><i style={{color: "#FF4F4F"}} className="ri-close-fill"></i> wrong answers: {quizs.length - correct}</h2>
          <h4>time left: {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}</h4>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="name" name='name' defaultValue={localStorage.getItem("name") ?? ""} />
            <input type="hidden" name='points' defaultValue={points} />
            <button type="submit">upload stats?</button>
            {error && <div style={{color: "red"}}>{error}</div>}
          </form>
        </div>
      }
      <div className={`${styles.lose} ${isLose? styles.true : ""}`}>
        <p>Time out. u lose</p>
        <button onClick={() => handleAgain()}>try again</button>
      </div>
    </div>
  );
}
