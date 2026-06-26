import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { speak, stopSpeaking } from "@/lib/speech";
import { useLang } from "@/lib/i18n";
import type { WordSet } from "@/data/words";


const DEFAULT_STEP_MS = 5000;
const MIN_STEP_MS = 1000;
const MAX_STEP_MS = 10000;

function CountdownBadge({ ms, total }: { ms: number; total: number }) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const progress = Math.max(0, Math.min(1, ms / total));
  const offset = circumference * (1 - progress);
  const seconds = Math.max(1, Math.ceil(ms / 1000));

  return (
    <div className="relative flex size-10 items-center justify-center">
      <svg className="size-10 -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={r} fill="none" stroke="currentColor" strokeWidth="4" className="text-primary/15" />
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
  const [stepMs, setStepMs] = useState(DEFAULT_STEP_MS);
  const [timeLeft, setTimeLeft] = useState(stepMs);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingOnPauseRef = useRef<number>(stepMs);
  const w = set.words[idx];

  // speak and reset timer whenever current word or step changes
  useEffect(() => {
    setTimeLeft(stepMs);
    remainingOnPauseRef.current = stepMs;
    speak(w.en);
  }, [w, stepMs]);

  // countdown ticker
  useEffect(() => {
    if (paused) {
      remainingOnPauseRef.current = timeLeft;
      return;
    }
    startTimeRef.current = Date.now() - (stepMs - remainingOnPauseRef.current);
    timerRef.current = window.setInterval(() => {
      const remaining = Math.max(0, stepMs - (Date.now() - startTimeRef.current));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        setIdx((i) => (i + 1) % set.words.length);
      }
    }, 100);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused, idx, set.words.length, stepMs, timeLeft]);

  useEffect(() => () => stopSpeaking(), []);

  const goPrev = () => {
    stopSpeaking();
    setIdx((i) => (i - 1 + set.words.length) % set.words.length);
  };
  const goNext = () => {
    stopSpeaking();
    setIdx((i) => (i + 1) % set.words.length);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3 text-sm font-semibold text-foreground/70">
        <span>
          {t("מילה", "Word")} {idx + 1} / {set.words.length}
        </span>
        <span className="text-foreground/40">•</span>
        <span>{paused ? t("מושהה", "Paused") : t("בהשמעה", "Playing")}</span>
        {!paused && <CountdownBadge ms={timeLeft} total={stepMs} />}
      </div>

      <div
        className="grid min-h-[260px] w-full place-items-center rounded-3xl border-2 border-primary/30 bg-card p-10 text-center shadow-md"
        dir="ltr"
      >
        <div>
          <div className="font-display text-4xl font-bold text-card-foreground sm:text-6xl">
            {w.en}
          </div>
          <div className="mt-6 text-2xl text-card-foreground/80 sm:text-3xl" dir="rtl">
            {w.he}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="lg" variant="outline" onClick={goPrev}>
          <ChevronRight className="size-5 rtl:hidden" />
          <ChevronLeft className="size-5 ltr:hidden" />
          {t("הקודמת", "Previous")}
        </Button>

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

        <Button size="lg" variant="secondary" disabled={!paused} onClick={() => speak(w.en)}>
          <Volume2 className="size-5" />
          {t("השמע שוב", "Repeat")}
        </Button>

        <Button size="lg" variant="outline" onClick={goNext}>
          {t("הבאה", "Next")}
          <ChevronLeft className="size-5 rtl:hidden" />
          <ChevronRight className="size-5 ltr:hidden" />
        </Button>
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-primary/20 bg-card/60 p-4">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold text-foreground/80">
          <span>{t("זמן בין מילים", "Time between words")}</span>
          <span className="tabular-nums text-primary">
            {(stepMs / 1000).toFixed(0)} {t("שניות", "sec")}
          </span>
        </div>
        <Slider
          value={[stepMs]}
          min={MIN_STEP_MS}
          max={MAX_STEP_MS}
          step={1000}
          onValueChange={(v) => setStepMs(v[0])}
        />
        <div className="mt-1 flex justify-between text-xs text-foreground/50">
          <span>1</span>
          <span>10</span>
        </div>
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
