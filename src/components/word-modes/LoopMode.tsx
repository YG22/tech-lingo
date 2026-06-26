import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speak, stopSpeaking } from "@/lib/speech";
import { useLang } from "@/lib/i18n";
import type { WordSet } from "@/data/words";


const STEP_MS = 5000;

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
  const [timeLeft, setTimeLeft] = useState(STEP_MS);
  const w = set.words[idx];
  const wordsLen = set.words.length;

  // speak and reset timer whenever current word changes
  useEffect(() => {
    setTimeLeft(STEP_MS);
    speak(w.en);
  }, [w]);

  // countdown ticker — independent of timeLeft to avoid resetting
  useEffect(() => {
    if (paused) return;
    const start = Date.now();
    const startRemaining = STEP_MS;
    const id = window.setInterval(() => {
      const remaining = Math.max(0, startRemaining - (Date.now() - start));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        window.clearInterval(id);
        setIdx((i) => (i + 1) % wordsLen);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [paused, idx, wordsLen]);

  useEffect(() => () => stopSpeaking(), []);

  const goPrev = () => {
    stopSpeaking();
    setIdx((i) => (i - 1 + wordsLen) % wordsLen);
  };
  const goNext = () => {
    stopSpeaking();
    setIdx((i) => (i + 1) % wordsLen);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3 text-sm font-semibold text-foreground/70">
        <span>
          {t("מילה", "Word")} {idx + 1} / {wordsLen}
        </span>
        <span className="text-foreground/40">•</span>
        <span>{paused ? t("מושהה", "Paused") : t("בהשמעה", "Playing")}</span>
        {!paused && <CountdownBadge ms={timeLeft} total={STEP_MS} />}
      </div>

      <div
        className="flex min-h-[260px] w-full flex-col items-center justify-center gap-6 rounded-3xl border-2 border-primary/30 bg-card p-10 text-center shadow-md"
        dir="ltr"
      >
        <div className="font-display text-4xl font-bold text-card-foreground sm:text-6xl">
          {w.en}
        </div>
        <div className="text-2xl text-card-foreground/80 sm:text-3xl" dir="rtl">
          {w.he}
        </div>
        <Button size="sm" variant="secondary" onClick={() => speak(w.en)}>
          <Volume2 className="size-4" />
          {t("השמע שוב", "Repeat")}
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="lg" variant="outline" onClick={goPrev}>
          <ChevronRight className="size-5 ltr:hidden" />
          <ChevronLeft className="size-5 rtl:hidden" />
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

        <Button size="lg" variant="outline" onClick={goNext}>
          {t("הבאה", "Next")}
          <ChevronLeft className="size-5 ltr:hidden" />
          <ChevronRight className="size-5 rtl:hidden" />
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
