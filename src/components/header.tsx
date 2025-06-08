"use client"
import 'remixicon/fonts/remixicon.css'
import styles from "../styles/header.module.scss"
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
type Player = {
  name: string;
  points: number;
};


export default function Header({ players = [] }:  { players: Player[] }) {
  const [isOpSettings, setIsOpSettings] = useState(false);
  const [isOpStats, setIsOpStats] = useState(false)
  const [seed, setSeed] = useState("0 0 0");
  const [playMusic, setPlayMusic] = useState(true);
  const [playSound, setPlaySound] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    if (!audioRef.current) return;

    if (playMusic) {
      const playAudio = () => {
        audioRef.current?.play().catch((err) => {
          console.warn("Audio play failed:", err);
        });
      };

      document.body.addEventListener("click", playAudio, { once: true });
      return () => document.body.removeEventListener("click", playAudio);
    } else {
      audioRef.current.pause();
    }
  }, [playMusic]);




  useEffect(() => {
    const musicPref = localStorage.getItem("music");
    const soundPref = localStorage.getItem("sound");
    setPlayMusic(musicPref === "true");
    setPlaySound(soundPref === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("music", String(playMusic));
  }, [playMusic]);

  useEffect(() => {
    localStorage.setItem("sound", String(playSound));
  }, [playSound]);



  useEffect(() => {
    if (typeof window !== "undefined") {
      setSeed(localStorage.getItem("seed") || "0 0 0");
    }
  }, [seed]);

  function resetStats() {
    setSeed("0 0 0")
  }
  

  return (
    <>
    <audio
        ref={audioRef}
        src="/sounds/bgSong.mp3"
        loop
        controls={false}
      />
      <div className={styles.header}>
        <div onClick={() => setIsOpSettings(!isOpStats && !isOpSettings)} className={`${styles.menuIcon} ${isOpSettings? styles.open : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <button 
        onClick={() => setIsOpStats(!isOpSettings && !isOpStats)}
        className={`${styles.statsBtn} ${!isOpSettings? styles.open : styles.close}`}>
          <span className="ri-list-unordered"></span>
          <span>Stats</span>
        </button>
        <div className={`${styles.pfp} ${isOpSettings? styles.open : styles.close}`}>
          <p>Login</p> <Image src="/Profile.png" alt='profile' width={32} height={32} />
        </div>
      </div>

      <div className={`${styles.settings} ${isOpSettings ? styles.open : ""}`}>
        <div>
          <h1 style={{animationDelay: "400ms"}}>Settings</h1>
          <div style={{animationDelay: "500ms"}}>
            <label htmlFor="music"><i className="ri-music-2-fill"></i> Music:</label>
            <input 
            checked={playMusic}
            onChange={() => setPlayMusic(prev => !prev)} type="checkbox" id="music"/>
          </div>
          <div style={{animationDelay: "600ms"}}>
            <label htmlFor="sound"><i className="ri-volume-up-fill"></i>Sound:</label>
            <input 
            checked={playSound}
            onChange={() => setPlaySound(prev => !prev)} type="checkbox" id="sound"/>
          </div>
        </div>
        <button onClick={() => setIsOpSettings(false)}
          style={{animationDelay: "500ms"}}>
          <i className="ri-logout-box-line"></i>
          <p>Leave</p>
        </button>
        
      </div>

      <div className={`${styles.stats} ${isOpStats? styles.open : ""}`}>
        <div>
          <h1>Stats</h1>
          <h2>Answered: {seed.split(" ")[0]}</h2>
          <h2><i style={{color: "#42AE5A"}} 
          className="ri-check-line"></i> Right answers: {seed.split(" ")[1]}</h2>
          <h2><i style={{color: "#FF4F4F"}} 
          className="ri-close-fill"></i> wrong answers: {seed.split(" ")[2]}</h2>
          <button onClick={() => resetStats()}>Reset Stats</button>
        </div>
        <aside>
          <h1>Ranking</h1>
          <h2><i className="ri-medal-line"></i> Current place:</h2>
          <h2><i className="ri-team-fill"></i> Players: {players.length}</h2>
          <ul>
            {players
            .slice()
            .sort((a: Player, b: Player) => b.points - a.points)
            .map((player: Player, index: number) => (
              <li 
              className={
                index === 0
                  ? styles.firstPlace
                  : index === 1
                  ? styles.secondPlace
                  : index === 2
                  ? styles.thirdPlace
                  : styles.defaultPlace
              }
              key={index}><span><span>{index + 1}.</span> {player.name}</span> <span>{player.points} points</span></li>
            ))}
    
          </ul>
        </aside>
      </div>
    </>
  )
}