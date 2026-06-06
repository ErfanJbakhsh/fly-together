"use client";

import React, { useEffect, useRef, useState } from "react";
import { Track } from "../types/Track";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
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
      <audio ref={audioRef} src={trackSrc} controls />
      {tracks.map((track, index) => (
        <div onClick={() => setTrackSrc(track.src)} key={index}>
          {track.name}
        </div>
      ))}

      <input
        onChange={handleChangeInput}
        type="file"
        accept=".mp3, .flac, .wav"
      />
    </>
  );
}
