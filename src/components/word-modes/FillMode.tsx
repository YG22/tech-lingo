import { useEffect, useMemo, useState } from "react";
import { Check, Volume2, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { speak } from "@/lib/speech";
import { useLang } from "@/lib/i18n";
import type { WordSet } from "@/data/words";

function maskWord(w: string): { mask: string; missing: number[] } {
  // Hide ~40% of letters (at least 1, not first character).
  const letters = w.split("");
  const candidates = letters
    .map((c, i) => ({ c, i }))
    .filter(({ c, i }) => /[a-zA-Z]/.test(c) && i !== 0);
  const hideCount = Math.max(1, Math.floor(candidates.length * 0.4));
  const shuffled = [...candidates].sort(() => Math.random() - 0.5).slice(0, hideCount);
  const missing = new Set(shuffled.map((x) => x.i));
  return {
    mask: letters.map((c, i) => (missing.has(i) ? "_" : c)).join(""),
    missing: Array.from(missing).sort((a, b) => a - b),
  };
}

export function FillMode({ set }: { set: WordSet }) {
  const { t } = useLang();
  const [idx, setIdx] = useState(0);
  const w = set.words[idx];
  const masked = useMemo(() => maskWord(w.en), [w]);
  const [value, setValue] = useState("");
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setValue("");
    setRevealed(false);
    speak(w.en);
  }, [w]);

  const attempt = (() => {
    const chars = w.en.split("");
    const inp = value.split("");
    let p = 0;
    return chars
      .map((c, i) => {
        if (!masked.missing.includes(i)) return c;
        const got = inp[p++] ?? "";
        return got || "_";
      })
      .join("");
  })();

  const correct = attempt.toLowerCase() === w.en.toLowerCase();

  const next = () => setIdx((i) => (i + 1) % set.words.length);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-sm font-semibold text-foreground/70">
        {t("מילה", "Word")} {idx + 1} / {set.words.length}
      </div>

      <div
        className="grid min-h-[180px] w-full place-items-center rounded-3xl border-2 border-primary/30 bg-card p-8 text-center shadow-md"
        dir="ltr"
      >
        <div>
          <div className="font-mono text-4xl font-bold tracking-[0.3em] sm:text-5xl">
            {(revealed ? w.en : masked.mask).split("").join(" ")}
          </div>
          <div className="mt-4 text-xl text-card-foreground/80" dir="rtl">
            {w.he}
          </div>
        </div>
      </div>

      <Input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t(
          `הקלד ${masked.missing.length} אותיות חסרות לפי הסדר`,
          `Type the ${masked.missing.length} missing letters in order`,
        )}
        className="text-center font-mono text-lg tracking-widest"
        dir="ltr"
        maxLength={masked.missing.length}
      />

      <div className="text-xl font-mono tracking-widest" dir="ltr">
        {attempt.split("").join(" ")}
        {correct && <Check className="ms-2 inline size-6 text-success" />}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="ghost" onClick={() => speak(w.en)}>
          <Volume2 />
          {t("השמע", "Hear")}
        </Button>
        <Button variant="outline" onClick={() => setRevealed(true)} disabled={revealed}>
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
