import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  LETTER_N,
  LETTER_R,
  LOGO_VIEWBOX,
  ORNAMENT_FILLS,
  ORNAMENT_STROKES,
  QUARTERS,
  RING_CENTERS,
  RING_CY,
  TEXTILE,
} from "../../src/logo/logo-paths";

export const LOGO_REVEAL = {
  id: "LogoReveal",
  fps: 60,
  durationInFrames: 216,
  width: 1600,
  height: 800,
} as const;

const C = {
  inkInner: "#18213b",
  inkOuter: "#0a0f1d",
  silver: "#c9cbce",
  silverDeep: "#8d9094",
  gold: "#c8a868",
  goldDeep: "#8f7238",
};

// Easing tokens: drawing reads best with ease-in-out, arrivals with a strong ease-out.
const draw = Easing.bezier(0.65, 0, 0.35, 1);
const arrive = Easing.bezier(0.23, 1, 0.32, 1);

function progress(frame: number, start: number, duration: number, easing = arrive) {
  return interpolate(frame, [start, start + duration], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export const LogoReveal: React.FC<{ transparent?: boolean }> = ({ transparent }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const logoWidth = width * 0.62;
  const glow = progress(frame, 0, 110);
  const settle = progress(frame, 0, LOGO_REVEAL.durationInFrames, Easing.bezier(0.16, 1, 0.3, 1));
  // Sheen sweeps across once after everything has landed.
  const sheen = interpolate(frame, [112, 176], [-0.6, 1.6], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const letterIn = (start: number, dx: number) => {
    const p = progress(frame, start, 54);
    return { opacity: p, transform: `translateX(${(1 - p) * dx}px)` };
  };

  return (
    <AbsoluteFill
      style={{
        background: transparent
          ? "transparent"
          : `radial-gradient(60% 70% at 50% 50%, ${C.inkInner} 0%, ${C.inkOuter} 100%)`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: logoWidth * 0.9,
          height: logoWidth * 0.5,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, rgba(200,168,104,${0.16 * glow}), rgba(200,168,104,0))`,
          filter: "blur(30px)",
        }}
      />
      <svg
        viewBox={`${LOGO_VIEWBOX.x} ${LOGO_VIEWBOX.y} ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
        style={{ width: logoWidth, overflow: "visible", transform: `scale(${0.965 + 0.035 * settle})` }}
      >
        <defs>
          <linearGradient id="silver" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor={C.silverDeep} />
            <stop offset="0.5" stopColor={C.silver} />
            <stop offset="1" stopColor={C.silverDeep} />
          </linearGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.gold} />
            <stop offset="1" stopColor={C.goldDeep} />
          </linearGradient>
          <linearGradient
            id="sheen"
            gradientUnits="userSpaceOnUse"
            x1={LOGO_VIEWBOX.x + LOGO_VIEWBOX.width * (sheen - 0.18)}
            x2={LOGO_VIEWBOX.x + LOGO_VIEWBOX.width * (sheen + 0.18)}
            y1="0"
            y2="0"
          >
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="logo-mask">
            <g fill="#fff">
              <path d={LETTER_N} />
              <path d={LETTER_R} />
              {TEXTILE.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </mask>
        </defs>

        {/* Ornament frames draw themselves on, quarter by quarter. */}
        {RING_CENTERS.map((cx, ring) => (
          <g key={cx} transform={`translate(${cx} ${RING_CY})`}>
            {QUARTERS.map((t) => (
              <g key={t} transform={t}>
                {ORNAMENT_STROKES.map((s, i) => {
                  const p = progress(frame, 4 + ring * 6 + i * 4, 58, draw);
                  return (
                    <path
                      key={i}
                      d={s.d}
                      pathLength={1}
                      fill="none"
                      stroke="url(#gold)"
                      strokeWidth={s.w}
                      strokeLinecap="round"
                      strokeDasharray="1 1"
                      strokeDashoffset={1 - p}
                      opacity={p > 0 ? 1 : 0}
                    />
                  );
                })}
                {ORNAMENT_FILLS.map((d, i) => {
                  const p = progress(frame, 50 + ring * 6 + i * 5, 36);
                  return <path key={i} d={d} fill="url(#gold)" opacity={p} />;
                })}
              </g>
            ))}
          </g>
        ))}

        {/* TEXTILE rises from the centre outwards. */}
        {TEXTILE.map((d, i) => {
          const p = progress(frame, 34 + Math.abs(i - 3) * 5, 44);
          return (
            <path
              key={i}
              d={d}
              fill="url(#silver)"
              opacity={p}
              style={{ transform: `translateY(${(1 - p) * 5}px)`, transformBox: "fill-box" }}
            />
          );
        })}

        {/* N and R slide out from behind the frames. */}
        <path d={LETTER_N} fill="url(#silver)" style={letterIn(62, 14)} />
        <path d={LETTER_R} fill="url(#silver)" style={letterIn(62, -14)} />

        {/* A single pass of light across the letters. */}
        <rect
          x={LOGO_VIEWBOX.x}
          y={LOGO_VIEWBOX.y}
          width={LOGO_VIEWBOX.width}
          height={LOGO_VIEWBOX.height}
          fill="url(#sheen)"
          mask="url(#logo-mask)"
          opacity={frame > 110 && frame < 180 ? 0.9 : 0}
        />
      </svg>
    </AbsoluteFill>
  );
};
