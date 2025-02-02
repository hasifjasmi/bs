"use client";
import { React, useEffect, useState } from "react";
import useSound from "use-sound";
import { soundstore } from "./soundstore";

export default function Meme() {
  const [soundID, setSoundID] = useState(0);

  const currSound = soundstore[soundID].audio;

  // Use `key` to force `useSound` to reload when `currSound` changes
  const [play, { stop }] = useSound(currSound, { key: currSound });

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-7">
        {soundstore.map((sound) => (
          <div
            key={sound.id}
            onClick={() => {
              stop(); // Stop previous sound
              setSoundID(sound.id); // Update state
              play(); // Play the new sound immediately
            }}
            className="button w-40 h-16 bg-red-500 rounded-lg cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#b91c1c,0_0px_0_0_#b91c1c]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#b91c1c,0_15px_0_0_#b91c1c]
            border-b-[1px] border-red-700"
          >
            <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg">
              {sound.id} {sound.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
