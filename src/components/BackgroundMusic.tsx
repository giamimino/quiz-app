"use client";
import React, { useRef, useState } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    audioRef.current?.play();
    setPlaying(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/sounds/bgSong.mp3"
        loop
        controls={false}
      />
      {!playing && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#af1a00] z-[999] flex flex-col items-center justify-center">
          <button onClick={handlePlay}
          className="px-6 py-2 bg-[#af1a00] text-white font-semibold rounded-xl shadow-md hover:bg-[#921500] transition duration-300 cursor-pointer"
          >
            click to accept
          </button>
            <p>by clicking u accept to play background music</p>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;