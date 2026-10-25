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
} from "./logo-paths";

const vb = `${LOGO_VIEWBOX.x} ${LOGO_VIEWBOX.y} ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`;

function Ring({ cx }: { cx: number }) {
  return (
    <g transform={`translate(${cx} ${RING_CY})`}>
      {QUARTERS.map((t) => (
        <g key={t} transform={t}>
          {ORNAMENT_STROKES.map((s, i) => (
            <path key={i} d={s.d} fill="none" stroke="currentColor" strokeWidth={s.w} strokeLinecap="round" />
          ))}
          {ORNAMENT_FILLS.map((d, i) => (
            <path key={i} d={d} fill="currentColor" />
          ))}
        </g>
      ))}
    </g>
  );
}

type Props = {
  className?: string;
  /** Colour of the ornament frames; letters use `currentColor`. */
  ornamentColor?: string;
  title?: string;
};

export function NoorLogo({ className, ornamentColor, title = "Noor Textile" }: Props) {
  return (
    <svg viewBox={vb} className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor">
        <path d={LETTER_N} />
        <path d={LETTER_R} />
        {TEXTILE.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g style={ornamentColor ? { color: ornamentColor } : undefined}>
        {RING_CENTERS.map((cx) => (
          <Ring key={cx} cx={cx} />
        ))}
      </g>
    </svg>
  );
}
