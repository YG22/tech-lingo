import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speak, stopSpeaking } from "@/lib/speech";
import { useLang } from "@/lib/i18n";
import type { WordSet } from "@/data/words";

const STEP_MS = 5000;

export function LoopMode({ set }: { set: WordSet }) {
  const { t } = useLang();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const w = set.words[idx];

  // speak whenever current word changes (and not paused on a manual stop)
  useEffect(() => {
    speak(w.en);
  }, [w]);

  // ticker
  useEffect(() => {
    if (paused) return;
    timer.current = window.setTimeout(() => {
      setIdx((i) => (i + 1) % set.words.length);
    }, STEP_MS);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [idx, paused, set.words.length]);

  useEffect(() => () => stopSpeaking(), []);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-sm font-semibold text-foreground/70">
        {t("מילה", "Word")} {idx + 1} / {set.words.length}
        {" • "}
        {paused ? t("מושהה", "Paused") : t("בהשמעה", "Playing")}
      </div>

      <div
        className="grid min-h-[260px] w-full place-items-center rounded-3xl border-2 border-primary/30 bg-card p-10 text-center shadow-md"
        dir="ltr"
      >
        <div>
          <div className="font-display text-4xl font-bold text-card-foreground sm:text-6xl">
            {w.en}
          </div>
          <div
            className="mt-6 text-2xl text-card-foreground/80 sm:text-3xl"
            dir="rtl"
          >
            {w.he}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          size="lg"
          variant={paused ? "default" : "outline"}
          onClick={() => {
            setPaused((p) => {
              const next = !p;
              if (next) stopSpeaking();
              return next;
            });
          }}
        >
          {paused ? <Play className="size-5" /> : <Pause className="size-5" />}
          {paused ? t("המשך", "Resume") : t("עצור", "Pause")}
        </Button>

        <Button
          size="lg"
          variant="secondary"
          disabled={!paused}
          onClick={() => speak(w.en)}
        >
          <Volume2 className="size-5" />
          {t("השמע שוב", "Repeat audio")}
        </Button>
      </div>

      <p className="max-w-md text-center text-xs text-foreground/60">
        {t(
          "טיפ: כשעוצרים ניתן להשמיע את המילה הנוכחית שוב ושוב כדי לשנן אותה.",
          "Tip: when paused, you can replay the current word as many times as you like.",
        )}
      </p>
    </div>
  );
}
