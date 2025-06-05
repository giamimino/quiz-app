"use client"
import styles from "./button.module.scss";
import React, { useState, useEffect } from "react";

export default function Button(props) {
  const [hovered, setHovered] = useState(false);
  const [chosenClr, setChosenClr] = useState(null);
  
  const colors = [
    "F03986 571530",
    "43DD65 15451F",
    "F2CA3C 594A16",
    "3C9BF2 163959",
    "A25DFE 3E1A6A",
    "FE6B3E 7A2E14",
    "50E3C2 1D4C43",
    "FF5CBA 5A1F44",
    "8A74F9 2E2761",
    "76F043 2F4F1A",
    "F2793C 5A2D16",
    "3CC9F2 145067",
    "E94560 571C26",
    "FFD95C 665317"
  ];


  useEffect(() => {
    const random = Math.floor(Math.random() * colors.length);
    setChosenClr(colors[random].split(" "));
  }, []);
  if (!chosenClr) return null;

  const shadowClr = `#${chosenClr[1]}`;
  const bg = `#${chosenClr[0]}`;

  return (
    <button
      onClick={props.onClick}
      className={styles.button}
      style={{
        color: shadowClr,
        backgroundColor: bg,
        border: `4px solid ${shadowClr}`,
        boxShadow: !hovered
          ? `4px 4px 0 ${shadowClr}`
          : `0 0 0 ${shadowClr}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {props.content}
    </button>
  );
}