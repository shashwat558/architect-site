"use client";

import { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import { BlueprintIntro } from "./BlueprintIntro";

export default function BlueprintLoader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3500); // 3.5 seconds total duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F5F3EE]"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-out",
      }}
    >
      <Player
        component={BlueprintIntro}
        durationInFrames={105} // 3.5 seconds at 30fps
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        style={{
          width: "100vw",
          height: "100vh",
        }}
        controls={false}
        autoPlay
        loop={false}
      />
    </div>
  );
}
