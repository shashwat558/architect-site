"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// ─── Carousel Images ─────────────────────────────────────────────────────────

const carouselImages = [
  { src: "/carousel/retro-1.png", caption: "Urban Geometry" },
  { src: "/carousel/retro-2.png", caption: "Light & Space" },
  { src: "/carousel/retro-3.png", caption: "Brutalist Form" },
  { src: "/carousel/retro-4.png", caption: "Sunset Retreat" },
  { src: "/carousel/retro-5.png", caption: "Zen Courtyard" },
  { src: "/carousel/retro-6.png", caption: "Curved Museum" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function RetroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Pause on hover
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleEnter = () => track.style.animationPlayState = "paused";
    const handleLeave = () => track.style.animationPlayState = "running";
    track.addEventListener("mouseenter", handleEnter);
    track.addEventListener("mouseleave", handleLeave);
    return () => {
      track.removeEventListener("mouseenter", handleEnter);
      track.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Double the images for seamless infinite loop
  const allImages = [...carouselImages, ...carouselImages];

  return (
    <div className="retro-carousel-wrapper">
      <div className="retro-carousel-track" ref={trackRef}>
        {allImages.map((img, i) => (
          <div key={`${img.src}-${i}`} className="retro-photo-frame">
            {/* Outer aged paper frame */}
            <div className="retro-photo-mat">
              {/* Inner image area */}
              <div className="retro-photo-image-wrap">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 28vw"
                  className="retro-photo-img"
                  quality={85}
                />
                {/* VHS scan-line overlay */}
                <div className="retro-scanlines" />
                {/* Film grain overlay */}
                <div className="retro-grain" />
              </div>
              {/* Caption underneath like a real photo */}
              <p className="retro-photo-caption">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Inline styles for the carousel – self-contained */}
      <style jsx>{`
        .retro-carousel-wrapper {
          width: 100%;
          overflow: hidden;
          padding: 1rem 0;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .retro-carousel-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: retro-scroll 30s linear infinite;
        }

        .retro-carousel-track:hover {
          animation-play-state: paused;
        }

        @keyframes retro-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .retro-photo-frame {
          flex-shrink: 0;
          width: 28vw;
          min-width: 260px;
          max-width: 380px;
        }

        .retro-photo-mat {
          background: linear-gradient(
            145deg,
            #f5f0e8 0%,
            #ede6d8 30%,
            #e8dfd0 60%,
            #ddd4c4 100%
          );
          padding: 12px 12px 28px 12px;
          border-radius: 2px;
          box-shadow: none;
          position: relative;
          transform: rotate(var(--tilt, 0deg));
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .retro-photo-frame:nth-child(odd) .retro-photo-mat {
          --tilt: -1.2deg;
        }
        .retro-photo-frame:nth-child(even) .retro-photo-mat {
          --tilt: 1.5deg;
        }
        .retro-photo-frame:nth-child(3n) .retro-photo-mat {
          --tilt: -0.6deg;
        }

        .retro-photo-mat:hover {
          transform: rotate(0deg) scale(1.03);
        }

        .retro-photo-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 1px;
          background: #1a1612;
        }

        .retro-photo-img {
          object-fit: cover;
          filter: sepia(0.15) contrast(1.05) saturate(0.85) brightness(0.95);
        }

        .retro-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(0, 0, 0, 0.03) 4px
          );
          pointer-events: none;
          z-index: 2;
        }

        .retro-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 3;
          mix-blend-mode: multiply;
          opacity: 0.5;
        }

        .retro-photo-caption {
          margin: 0;
          padding-top: 10px;
          text-align: center;
          font-family: "Courier New", "Courier", monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8a7a6a;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .retro-carousel-track {
            gap: 1.2rem;
          }
          .retro-photo-frame {
            width: 65vw;
            min-width: 220px;
            max-width: 300px;
          }
          .retro-photo-mat {
            padding: 8px 8px 22px 8px;
          }
        }
      `}</style>
    </div>
  );
}
