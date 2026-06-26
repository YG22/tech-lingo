import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import type { Topic } from "@/data/qa";

export function QADeck({ topic }: { topic: Topic }) {
  const { t, lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [showA, setShowA] = useState(false);
  const item = topic.items[idx];

  useEffect(() => setShowA(false), [idx, lang]);

  const prev = () => setIdx((i) => (i - 1 + topic.items.length) % topic.items.length);
  const next = () => setIdx((i) => (i + 1) % topic.items.length);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">
          {t(topic.title_he, topic.title_en)}
        </h1>
        <div className="text-sm font-semibold text-foreground/70">
          {idx + 1} / {topic.items.length}
        </div>
      </div>

      <div
        className="rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-md"
        dir={lang === "he" ? "rtl" : "ltr"}
      >
        <div className="text-xs font-semibold uppercase tracking-wider text-primary/70">
          {t("שאלה", "Question")}
        </div>
        <div className="mt-2 font-display text-xl font-bold leading-snug text-card-foreground sm:text-2xl">
          {lang === "he" ? item.q_he : item.q_en}
        </div>

        {showA ? (
          <div className="mt-6 rounded-2xl bg-background/60 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              {t("תשובה", "Answer")}
            </div>
            <div className="mt-2 whitespace-pre-line text-base leading-relaxed text-card-foreground/90">
              {lang === "he" ? item.a_he : item.a_en}
            </div>
          </div>
        ) : (
          <Button
            className="mt-6 w-full"
            size="lg"
            onClick={() => setShowA(true)}
            variant="default"
          >
            <Eye className="size-4" />
            {t("צפה בתשובה", "Show answer")}
          </Button>
        )}

        {showA && (
          <Button
            className="mt-3 w-full"
            variant="outline"
            onClick={() => setShowA(false)}
          >
            <EyeOff className="size-4" />
            {t("הסתר תשובה", "Hide answer")}
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button onClick={prev} variant="outline" size="lg">
          <ChevronRight className="size-5 rtl:hidden" />
          <ChevronLeft className="size-5 ltr:hidden" />
          {t("הקודמת", "Previous")}
        </Button>
        <Button onClick={next} size="lg">
          {t("הבאה", "Next")}
          <ChevronLeft className="size-5 rtl:hidden" />
          <ChevronRight className="size-5 ltr:hidden" />
        </Button>
      </div>
    </div>
  );
}
