import { useEffect, useMemo, useState } from "react";
import { Check, Volume2, Eye, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speak } from "@/lib/speech";
import { useLang } from "@/lib/i18n";
import type { WordSet } from "@/data/words";

function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h >>> 0) / 4294967296;
  };
}

function maskWord(w: string): { missing: number[] } {
  const letters = w.split("");
  const candidates = letters
    .map((c, i) => ({ c, i }))
    .filter(({ c, i }) => /[a-zA-Z]/.test(c) && i !== 0);
  const hideCount = Math.max(1, Math.floor(candidates.length * 0.4));

  // Deterministic shuffle so SSR and client render the same mask.
  const rng = seededRandom(w.toLowerCase());
  const indices = candidates.map((x) => x.i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const missing = indices.slice(0, hideCount).sort((a, b) => a - b);
  return { missing };
}

export function FillMode({ set }: { set: WordSet }) {
  const { t } = useLang();
  const [idx, setIdx] = useState(0);
  const w = set.words[idx];
  const masked = useMemo(() => maskWord(w.en), [w]);
  const [values, setValues] = useState<string[]>(
    () => new Array(masked.missing.length).fill(""),
  );
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setValues(new Array(masked.missing.length).fill(""));
    setRevealed(false);
    speak(w.en);
  }, [w, masked.missing.length]);

  const correct = masked.missing.every(
    (pos, i) => values[i]?.toLowerCase() === w.en[pos].toLowerCase(),
  );

  const handleChange = (i: number, val: string) => {
    const char = val.slice(-1);
    const pos = masked.missing[i];
    const expected = w.en[pos];
    const expectedIsUpper = expected === expected.toUpperCase() && expected !== expected.toLowerCase();
    const cased = char ? (expectedIsUpper ? char.toUpperCase() : char.toLowerCase()) : "";
    const next = [...values];
    next[i] = cased;
    setValues(next);
    if (cased && i + 1 < masked.missing.length) {
      document.getElementById(`letter-${i + 1}`)?.focus();
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...values];
      if (next[i]) {
        next[i] = "";
        setValues(next);
      } else if (i > 0) {
        next[i - 1] = "";
        setValues(next);
        document.getElementById(`letter-${i - 1}`)?.focus();
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      document.getElementById(`letter-${i - 1}`)?.focus();
    } else if (e.key === "ArrowRight" && i + 1 < masked.missing.length) {
      e.preventDefault();
      document.getElementById(`letter-${i + 1}`)?.focus();
    }
  };

  const next = () => setIdx((i) => (i + 1) % set.words.length);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-sm font-semibold text-foreground/70">
        {t("מילה", "Word")} {idx + 1} / {set.words.length}
      </div>

      <div
        className="grid min-h-[220px] w-full place-items-center rounded-3xl border-2 border-primary/30 bg-card p-8 text-center shadow-md"
        dir="ltr"
      >
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-2xl font-bold tracking-wider sm:text-4xl">
            {w.en.split("").map((c, i) => {
              const missingIndex = masked.missing.indexOf(i);
              if (missingIndex === -1 || revealed) {
                return (
                  <span key={i} className="inline-block min-w-[0.6em] text-center">
                    {c}
                  </span>
                );
              }
              return (
                <input
                  key={i}
                  id={`letter-${missingIndex}`}
                  type="text"
                  value={values[missingIndex]}
                  onChange={(e) => handleChange(missingIndex, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(missingIndex, e)}
                  maxLength={1}
                  autoFocus={missingIndex === 0}
                  className="inline-block w-[1.1em] border-b-2 border-b-card-foreground/50 bg-transparent text-center outline-none transition focus:border-b-primary"
                />
              );
            })}
          </div>
          <div className="text-xl text-card-foreground/80" dir="rtl">
            {w.he}
          </div>
          {correct && !revealed && (
            <div className="flex items-center gap-1 text-sm font-semibold text-success">
              <Check className="size-4" />
              {t("נכון!", "Correct!")}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="ghost" onClick={() => speak(w.en)}>
          <Volume2 />
          {t("השמע", "Hear")}
        </Button>
        <Button
          variant="outline"
          onClick={() => setRevealed(true)}
          disabled={revealed}
        >
          <Eye />
          {t("חשוף", "Reveal")}
        </Button>
        <Button onClick={next}>
          {t("הבא", "Next")}
          <ArrowRight className="rotate-180 rtl:rotate-0" />
        </Button>
      </div>
    </div>
  );
}
