import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { useLang } from "@/lib/i18n";
import { LEVEL_LABELS, WORD_SETS, type Level } from "@/data/words";
import { isCompleted } from "@/lib/storage";

export const Route = createFileRoute("/words/$level/")({
  loader: ({ params }) => {
    const lvl = params.level as Level;
    if (!WORD_SETS[lvl]) throw notFound();
    return { level: lvl };
  },
  component: SetsList,
  notFoundComponent: () => <div className="p-8 text-center">Level not found</div>,
});

function SetsList() {
  const data = Route.useLoaderData();
  const level = data.level as Level;
  const { t } = useLang();
  const sets = WORD_SETS[level];
  const [, force] = useState(0);
  useEffect(() => {
    const h = () => force((x) => x + 1);
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);

  return (
    <div className="min-h-screen">
      <AppHeader back="/words" />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 font-display text-2xl font-bold">
          {t(LEVEL_LABELS[level].he, LEVEL_LABELS[level].en)}
        </h1>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {sets.map((s) => {
            const done = isCompleted(level, s.id);
            return (
              <Link
                key={s.id}
                to="/words/$level/$setId"
                params={{ level, setId: String(s.id) }}
                className={`relative rounded-2xl border-2 p-4 text-center shadow-sm transition hover:-translate-y-0.5 ${
                  done
                    ? "border-success/40 bg-success/10 opacity-70"
                    : "border-primary/30 bg-card hover:border-primary hover:shadow-md"
                }`}
              >
                {done && (
                  <span className="absolute end-2 top-2 grid size-6 place-items-center rounded-full bg-success text-success-foreground">
                    <Check className="size-4" />
                  </span>
                )}
                <div className="text-xs font-semibold text-primary/70">
                  {t("סט", "Set")} #{s.id}
                </div>
                <div className="mt-2 font-display text-sm font-bold">
                  {s.words.length} {t("מילים", "words")}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
