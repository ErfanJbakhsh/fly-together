"use client";

import React, { useEffect, useRef, useState } from "react";
import { Track } from "../types/Track";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackSrc, setTrackSrc] = useState("");

  const refreshTracks = async () => {
    const res = await fetch("api/tracks");
    const data = await res.json();
    setTracks(data);
  };

  useEffect(() => {
    refreshTracks();
  }, []);

  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const { src } = await res.json();

    setTrackSrc(src);
    await refreshTracks();
  };

  return (
    <>
      <audio ref={audioRef} src={trackSrc} />
      <div className="flex flex-col w-64 mt-5 ms-5">
        <h2 className="text-white/60">Library</h2>
        {tracks.map((track, index) => (
          <button
            className="text-white/60 p-2 cursor-pointer focus:text-purple-500 focus:border focus:rounded-xl focus:bg-purple-500/10 focus:border-purple-500/30 flex justify-baseline truncate"
            onClick={() => setTrackSrc(track.src)}
            key={index}
          >
            {track.name}
          </button>
        ))}
        <button
          onClick={() => inputRef.current?.click()}
          className="p-2 cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl bg-[#AD46FF]/10 border border-[#AD46FF]/30 text-[#AD46FF] text-sm hover:bg-[#AD46FF]/20 transition-colors"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Import
        </button>
      </div>

      <input
        ref={inputRef}
        onChange={handleChangeInput}
        type="file"
        className="hidden"
        accept=".mp3, .flac, .wav"
      />
    </>
  );
}
