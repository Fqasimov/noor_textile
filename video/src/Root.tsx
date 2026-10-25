import { Composition } from "remotion";
import { LOGO_REVEAL, LogoReveal } from "./LogoReveal";

export const RemotionRoot: React.FC = () => (
  <Composition
    id={LOGO_REVEAL.id}
    component={LogoReveal}
    durationInFrames={LOGO_REVEAL.durationInFrames}
    fps={LOGO_REVEAL.fps}
    width={LOGO_REVEAL.width}
    height={LOGO_REVEAL.height}
    defaultProps={{ transparent: false }}
  />
);
