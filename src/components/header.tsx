"use client"
import 'remixicon/fonts/remixicon.css'
import styles from "../styles/header.module.scss"
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header({ players = [] }: any) {
  const [isOpSettings, setIsOpSettings] = useState(false);
  const [isOpStats, setIsOpStats] = useState(false)
  const [seed, setSeed] = useState("0 0 0");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSeed(localStorage.getItem("seed") || "0 0 0");
    }
  }, []);

  function resetStats() {
    setSeed("0 0 0")
  }
  

  return (
    <>
      <div className={styles.header}>
        <div onClick={() => setIsOpSettings(isOpSettings? false : true)} className={`${styles.menuIcon} ${isOpSettings? styles.open : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <button className={`${styles.stats} ${!isOpSettings? styles.open : styles.close}`}>
          <span className="ri-list-unordered"></span>
          <span>Stats</span>
        </button>
        <div className={`${styles.pfp} ${isOpSettings? styles.open : styles.close}`}>
          <p>Login</p> <Image src="/Profile.png" alt='profile' width={32} height={32} />
        </div>
      </div>

      <div className={`${styles.settings} ${isOpSettings ? styles.open : ""}`}>
        <div>
          <h1 style={{transitionDelay: "400ms"}}>Settings</h1>
          <div style={{transitionDelay: "500ms"}}>
            <label htmlFor="music"><i className="ri-music-2-fill"></i> Music:</label>
            <input type="checkbox" id="music"/>
          </div>
          <div style={{transitionDelay: "600ms"}}>
            <label htmlFor="sound"><i className="ri-volume-up-fill"></i>Sound:</label>
            <input type="checkbox" id="sound"/>
          </div>
        </div>
        <button onClick={() => setIsOpSettings(false)}
          style={{transitionDelay: "500ms"}}>
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
          <button>Resey Stats</button>
        </div>
        <aside>
          <h1>Ranking</h1>
          <h2>Current place:</h2>
          <h2>Players: {players.length}</h2>
          <ul>
            {players.map((player:any, index:number) => (
              <li key={index}><span>{index + 1}. {player.name}</span> <span>{player.points} points</span></li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  )
}