import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import {
  LETTER_N,
  LETTER_R,
  LOGO_VIEWBOX as V,
  ORNAMENT_FILLS,
  ORNAMENT_STROKES,
  QUARTERS,
  RING_CENTERS,
  RING_CY,
  TEXTILE,
} from "../../src/logo/logo-paths";

/*
 * The site intro as a video (src/components/IntroOverlay.vue uses the same timings):
 * white page, NOOR laid in gold, TEXTILE in black inside the O's, then a fly-through
 * the first O that opens onto the hero photograph.
 */
export const LOGO_REVEAL = {
  id: "LogoReveal",
  fps: 60,
  durationInFrames: 240,
  width: 1600,
  height: 900,
} as const;

const draw = Easing.bezier(0.65, 0, 0.35, 1);
const arrive = Easing.bezier(0.23, 1, 0.32, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const p = (frame: number, start: number, duration: number, easing = arrive) =>
  interpolate(frame, [start, start + duration], [0, 1], { easing, ...clamp });

const ZOOM_AT = 141;
const ZOOM_FRAMES = 81;
const MAX_SCALE = 90;
const HOLE = 5.5;

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const logoW = Math.min(width * 0.68, 920);
  const ppu = logoW / V.width;
  const left = (width - logoW) / 2;
  const top = (height - V.height * ppu) / 2;
  const ox = left + (RING_CENTERS[0] - V.x) * ppu;
  const oy = top + (RING_CY - V.y) * ppu;

  const z = interpolate(frame, [ZOOM_AT, ZOOM_AT + ZOOM_FRAMES], [0, 1], { easing: Easing.bezier(0.76, 0, 0.24, 1), ...clamp });
  const scale = Math.exp(Math.log(MAX_SCALE) * z);
  const hole = HOLE * ppu * (scale - 1);
  const mask = `radial-gradient(circle at ${ox}px ${oy}px, transparent ${hole}px, #000 ${hole + 1}px)`;

  return (
    <AbsoluteFill>
      <Img src={staticFile("hero.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", scale: String(1.08 - 0.08 * z) }} />
      <AbsoluteFill style={{ background: "#fff", maskImage: mask, WebkitMaskImage: mask }} />
      <svg
        viewBox={`${V.x} ${V.y} ${V.width} ${V.height}`}
        style={{
          position: "absolute",
          left,
          top,
          width: logoW,
          overflow: "visible",
          scale: String(scale),
          transformOrigin: `${ox - left}px ${oy - top}px`,
        }}
      >
        <defs>
          <linearGradient id="foil" x1="20" y1="30" x2="316" y2="114" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8a6a26" />
            <stop offset="0.22" stopColor="#c9a24e" />
            <stop offset="0.4" stopColor="#f3dfa0" />
            <stop offset="0.58" stopColor="#b38b3a" />
            <stop offset="0.78" stopColor="#e9cf8c" />
            <stop offset="1" stopColor="#7d5d1e" />
          </linearGradient>
          <linearGradient id="foil-b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9c7a2e" />
            <stop offset="0.45" stopColor="#f0d998" />
            <stop offset="1" stopColor="#a8822f" />
          </linearGradient>
        </defs>

        {RING_CENTERS.map((cx, ring) => (
          <g key={cx} transform={`translate(${cx} ${RING_CY})`}>
            {QUARTERS.map((t) => (
              <g key={t} transform={t}>
                {ORNAMENT_STROKES.map((s, i) => {
                  const d = p(frame, 5 + ring * 5 + i * 3, 57, draw);
                  return (
                    <path
                      key={i}
                      d={s.d}
                      pathLength={1}
                      fill="none"
                      stroke="url(#foil-b)"
                      strokeWidth={s.w}
                      strokeLinecap="round"
                      strokeDasharray="1 1"
                      strokeDashoffset={1 - d}
                      opacity={d > 0 ? 1 : 0}
                    />
                  );
                })}
                {ORNAMENT_FILLS.map((d, i) => (
                  <path key={i} d={d} fill="url(#foil-b)" opacity={p(frame, 49 + ring * 5 + i * 4, 30)} />
                ))}
              </g>
            ))}
          </g>
        ))}

        <path d={LETTER_N} fill="url(#foil)" style={{ opacity: p(frame, 25, 54), translate: `${(1 - p(frame, 25, 54)) * 16}px 0px` }} />
        <path d={LETTER_R} fill="url(#foil)" style={{ opacity: p(frame, 25, 54), translate: `${(1 - p(frame, 25, 54)) * -16}px 0px` }} />

        {TEXTILE.map((d, i) => {
          const t = p(frame, 75 + Math.abs(i - 3) * 4, 39);
          return <path key={i} d={d} fill="#0d0c0a" style={{ opacity: t, translate: `0px ${(1 - t) * 4}px`, transformBox: "fill-box" }} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};
