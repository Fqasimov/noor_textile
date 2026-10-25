"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { PlayerRef } from "@remotion/player";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LOGO_REVEAL, LogoReveal } from "@/remotion/LogoReveal";
import { NoorLogo } from "@/components/logo/NoorLogo";
import { useIntro } from "./IntroProvider";

const Player = dynamic(() => import("@remotion/player").then((m) => m.Player), { ssr: false });

// Hold on the finished logo briefly before lifting the curtain.
const HOLD_MS = 350;
// Never trap the visitor if the player fails to load.
const SAFETY_MS = 6000;

export function IntroOverlay() {
  const { finish } = useIntro();
  const reduceMotion = useReducedMotion();
  const playerRef = useRef<PlayerRef>(null);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "seen") {
      setVisible(false);
      return;
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => leave(), SAFETY_MS);
    return () => clearTimeout(t);
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !reduceMotion) return;
    const t = setTimeout(() => leave(), 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, reduceMotion]);

  function leave() {
    setVisible(false);
  }

  // The Player mounts lazily; poll once per frame until its ref is attached.
  useEffect(() => {
    if (!mounted || reduceMotion) return;
    let raf = 0;
    let cleanup: (() => void) | undefined;
    const attach = () => {
      const p = playerRef.current;
      if (!p) {
        raf = requestAnimationFrame(attach);
        return;
      }
      const onEnded = () => setTimeout(leave, HOLD_MS);
      p.addEventListener("ended", onEnded);
      cleanup = () => p.removeEventListener("ended", onEnded);
    };
    attach();
    return () => {
      cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, [mounted, reduceMotion]);

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible && (
        <motion.div
          key="intro"
          data-intro-overlay
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-ink"
          style={{ background: "radial-gradient(60% 70% at 50% 50%, #18213b 0%, #0a0f1d 100%)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          onClick={leave}
          aria-label="Noor Textile"
          role="presentation"
        >
          <motion.div
            className="w-full max-w-[1600px]"
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {mounted &&
              (reduceMotion ? (
                <div className="mx-auto w-[62%] text-silver-soft">
                  <NoorLogo ornamentColor="#c8a868" />
                </div>
              ) : (
                <Player
                  ref={playerRef}
                  component={LogoReveal}
                  inputProps={{ transparent: true }}
                  durationInFrames={LOGO_REVEAL.durationInFrames}
                  fps={LOGO_REVEAL.fps}
                  compositionWidth={LOGO_REVEAL.width}
                  compositionHeight={LOGO_REVEAL.height}
                  style={{ width: "100%", aspectRatio: `${LOGO_REVEAL.width} / ${LOGO_REVEAL.height}` }}
                  autoPlay
                  initiallyMuted
                  numberOfSharedAudioTags={0}
                  controls={false}
                  loop={false}
                  clickToPlay={false}
                  acknowledgeRemotionLicense
                />
              ))}
          </motion.div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              leave();
            }}
            className="eyebrow absolute bottom-8 right-6 text-silver/70 transition-colors hover:text-gold-soft sm:right-10"
          >
            Keç
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
