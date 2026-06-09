"use client";

import Header from "./components/Header";
import AudioPlayer from "./components/AudioPlayer";
import { useSession } from "next-auth/react";
import Providers from "./providers";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header />
      <AudioPlayer />
    </>
  );
}
