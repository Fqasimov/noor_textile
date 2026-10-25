import { ref } from "vue";

const KEY = "noor-intro";

function seenThisSession() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

/** Whether the logo intro still needs to play (once per browser session). */
export const introPlaying = ref(!seenThisSession());
/** Flips true once the intro curtain has lifted — sections wait on it for their entrance. */
export const introDone = ref(!introPlaying.value);

export function finishIntro() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {}
  introPlaying.value = false;
}
