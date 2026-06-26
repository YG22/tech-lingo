import { useEffect, useMemo, useState } from "react";
import { Check, X, Volume2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speak } from "@/lib/speech";
import { useLang } from "@/lib/i18n";
import { allWords, type WordSet } from "@/data/words";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuizMode({ set }: { set: WordSet }) {
  const { t } = useLang();
  const pool = useMemo(() => allWords(), []);
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<typeof set.words>(set.words);
  const [idx, setIdx] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const cur = order[idx];

  useEffect(() => {
    setOrder(shuffle(set.words));
    setIdx(0);
    setScore(0);
    setMounted(true);
  }, [set]);

  const choices = useMemo(() => {
    if (!mounted) return [cur.he, "", "", ""];
    const others = shuffle(pool.filter((w) => w.he !== cur.he)).slice(0, 3);
    return shuffle([cur, ...others]).map((w) => w.he);
  }, [cur, pool, mounted]);

  useEffect(() => {
    if (!mounted) return;
    speak(cur.en);
    setPicks([]);
    setLocked(false);
  }, [cur, mounted]);


  const onPick = (he: string) => {
    if (locked || picks.includes(he)) return;
    const nextPicks = [...picks, he];
    setPicks(nextPicks);
    if (he === cur.he) {
      setLocked(true);
      if (nextPicks.length === 1) setScore((s) => s + 1);
    } else if (nextPicks.length >= 2) {
      // Second wrong attempt — reveal correct answer
      setLocked(true);
    }
  };

  const next = () => {
    if (idx + 1 < order.length) setIdx(idx + 1);
    else {
      setOrder(shuffle(set.words));
      setIdx(0);
      setScore(0);
    }
  };

  const finished = idx + 1 === order.length && locked;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full items-center justify-between text-sm font-semibold text-foreground/70">
        <span>
          {t("שאלה", "Question")} {idx + 1} / {order.length}
        </span>
        <span>
          {t("ניקוד", "Score")}: {score}
        </span>
      </div>

      <div
        className="grid min-h-[160px] w-full place-items-center rounded-3xl border-2 border-primary/30 bg-card p-8 shadow-md"
        dir="ltr"
      >
        <div className="flex items-center gap-4">
          <div className="font-display text-4xl font-bold sm:text-5xl">{cur.en}</div>
          <Button size="icon" variant="ghost" onClick={() => speak(cur.en)}>
            <Volume2 />
          </Button>
        </div>
      </div>

      {picks.length === 1 && !locked && (
        <div className="text-sm font-semibold text-destructive">
          {t("לא נכון, יש לך עוד ניסיון אחד", "Not quite — you have one more try")}
        </div>
      )}

      <div className="grid w-full gap-2 sm:grid-cols-2">
        {choices.map((he) => {
          const isCorrect = he === cur.he;
          const isPicked = picks.includes(he);
          const revealCorrect = locked && isCorrect;
          const showWrong = isPicked && !isCorrect;
          return (
            <button
              key={he}
              onClick={() => onPick(he)}
              disabled={locked || isPicked}
              className={`flex items-center justify-between rounded-xl border-2 p-4 text-right text-base transition ${
                revealCorrect
                  ? "border-success bg-success/15"
                  : showWrong
                    ? "border-destructive bg-destructive/15 opacity-70"
                    : "border-primary/30 bg-card hover:border-primary disabled:opacity-60"
              }`}
            >
              <span>{he}</span>
              {revealCorrect && <Check className="size-5 text-success" />}
              {showWrong && <X className="size-5 text-destructive" />}
            </button>
          );
        })}
      </div>

      {locked && (
        <Button size="lg" onClick={next}>
          {finished ? (
            <>
              <RotateCcw className="size-4" />
              {t("התחל מחדש", "Start over")}
            </>
          ) : (
            t("שאלה הבאה", "Next question")
          )}
        </Button>
      )}
    </div>
  );
}

