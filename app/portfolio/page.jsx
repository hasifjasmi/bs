"use client";
import React from "react";
import useSound from "use-sound";

export default function Meme() {
  const getout = "/GETOUT.mp3"; // Correctly reference the audio file
  const [play] = useSound(getout);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div
          onClick={play}
          class="button w-40 h-16 bg-red-500 rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#b91c1c,0_0px_0_0_#b91c1c]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#b91c1c,0_15px_0_0_#b91c1c]
    border-b-[1px] border-red-700
  "
        >
          <span class="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
            GET OUT
          </span>
        </div>
      </div>
    </>
  );
}
