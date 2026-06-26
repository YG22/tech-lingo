import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { speak, stopSpeaking } from "@/lib/speech";
import { useLang } from "@/lib/i18n";
import type { WordSet } from "@/data/words";


const STEP_MS = 5000;

function CountdownBadge({ ms }: { ms: number }) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const progress = Math.max(0, Math.min(1, ms / STEP_MS));
  const offset = circumference * (1 - progress);
  const seconds = Math.max(1, Math.ceil(ms / 1000));

  return (
    <div className="relative flex size-10 items-center justify-center">
      <svg className="size-10 -rotate-90" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-primary/15"
        />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary transition-all duration-100 ease-linear"
        />
      </svg>
      <span className="absolute text-xs font-semibold tabular-nums text-primary">
        {seconds}
      </span>
    </div>
  );
}

export function LoopMode({ set }: { set: WordSet }) {
  const { t } = useLang();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(STEP_MS);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingOnPauseRef = useRef<number>(STEP_MS);
  const w = set.words[idx];

  // speak and reset timer whenever current word changes
  useEffect(() => {
    setTimeLeft(STEP_MS);
    remainingOnPauseRef.current = STEP_MS;
    speak(w.en);
  }, [w]);

  // countdown ticker
  useEffect(() => {
    if (paused) {
      remainingOnPauseRef.current = timeLeft;
      return;
    }
    startTimeRef.current = Date.now() - (STEP_MS - remainingOnPauseRef.current);
    timerRef.current = window.setInterval(() => {
      const remaining = Math.max(0, STEP_MS - (Date.now() - startTimeRef.current));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        setIdx((i) => (i + 1) % set.words.length);
      }
    }, 100);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused, idx, set.words.length]);

  useEffect(() => () => stopSpeaking(), []);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-3 text-sm font-semibold text-foreground/70">
        <span>
          {t("מילה", "Word")} {idx + 1} / {set.words.length}
        </span>
        <span className="text-foreground/40">•</span>
        <span>{paused ? t("מושהה", "Paused") : t("בהשמעה", "Playing")}</span>
        {!paused && <CountdownBadge ms={timeLeft} />}
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
