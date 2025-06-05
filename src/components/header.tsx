"use client"
import 'remixicon/fonts/remixicon.css'
import styles from "../styles/header.module.scss"
import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [isOpSettings, setIsOpSettings] = useState(false)

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
    </>
  )
}