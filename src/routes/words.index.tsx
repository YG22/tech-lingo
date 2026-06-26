import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { useLang } from "@/lib/i18n";
import { LEVEL_LABELS, WORD_SETS, type Level } from "@/data/words";

export const Route = createFileRoute("/words/")({
  component: WordsLevels,
});

function WordsLevels() {
  const { t } = useLang();
  const levels: Level[] = ["easy", "medium", "hard"];
  return (
    <div className="min-h-screen">
      <AppHeader back="/" />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 font-display text-2xl font-bold">
          {t("בחר דרגת קושי", "Choose difficulty")}
        </h1>
        <div className="grid gap-4">
          {levels.map((lvl, i) => (
            <Link
              key={lvl}
              to="/words/$level"
              params={{ level: lvl }}
              className="rounded-2xl border-2 border-primary/30 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-primary/70">
                    {t("רמה", "Level")} {i + 1}
                  </div>
                  <h2 className="mt-1 font-display text-lg font-bold">
                    {t(LEVEL_LABELS[lvl].he, LEVEL_LABELS[lvl].en)}
                  </h2>
                </div>
                <div className="text-sm text-card-foreground/70">
                  {WORD_SETS[lvl].length} {t("סטים", "sets")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
