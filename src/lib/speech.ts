// Tiny wrapper around Web Speech API for English pronunciation.
export function speak(text: string, opts: { rate?: number; lang?: string } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = opts.lang ?? "en-US";
    u.rate = opts.rate ?? 0.95;
    u.pitch = 1;
    const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("en"));
    if (voice) u.voice = voice;
    window.speechSynthesis.speak(u);
  } catch {
    /* noop */
  }
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
