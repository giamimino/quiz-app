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
  }, [answered]);

  function handleAnswer(haveAnswered: any) {
    if (randomIndex === null) return;
    setAnswered(answered + 1);
    setAnsweredIndexes([...answeredIndexes, randomIndex]);
    if (haveAnswered === quizs[randomIndex].correctAnswer) {
      setPoints(points + 100);
      setTime(time + 30);
      setCorrect(correct + 1);
    } else {
      setPoints(points + 10);
      setTime(time - 10);
    }
  }
  
  const [time, setTime] = useState(300);
  useEffect(() => {
    if (time > 0 && answered < quizs.length) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time, answered]);
  return (
    <div className={styles.page}>
      <div className={styles.quizSummary}>
        <div>
          <i className="ri-question-line"></i>
          <p>{answered}/{quizs.length}</p>
        </div>
        <div>{points} points</div>
        <div>
          <p>
            {String(Math.floor(time / 60))}:
            {String(time % 60)}
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
        <>
          <h2>correct answers: {correct}</h2>
          <h3>wrong answers: {quizs.length - correct}</h3>
          <h4>time left: {String(Math.floor(time / 60))}:{String(time % 60)}</h4>
          <form action={uploadResult}>
            <input type="hidden" name='name' defaultValue={localStorage.getItem("name") ?? ""} />
            <input type="hidden" name='points' defaultValue={points} />
            <button type="submit">ok</button>
          </form>
        </>
      }
    </div>
  );
}
