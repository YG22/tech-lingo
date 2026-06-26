import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Repeat, ListChecks, Pencil, Check, CircleDot } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { getSet, type Level } from "@/data/words";
import { isCompleted, toggleCompleted } from "@/lib/storage";

export const Route = createFileRoute("/words/$level/$setId/")({
  loader: ({ params }) => {
    const level = params.level as Level;
    const setId = Number(params.setId);
    const set = getSet(level, setId);
    if (!set) throw notFound();
    return { level, setId, set };
  },
  component: SetMenu,
  notFoundComponent: () => <div className="p-8 text-center">Set not found</div>,
});

function SetMenu() {
  const { level, setId, set } = Route.useLoaderData();
  const { t } = useLang();
  const [done, setDone] = useState(() => isCompleted(level, setId));

  const modes = [
    {
      mode: "loop",
      icon: Repeat,
      he: "לופ שמיעה אינסופי",
      en: "Infinite audio loop",
      desc_he: "כל מילה מוצגת ונאמרת 5 שניות, ואז עוברת לבאה",
      desc_en: "Each word shown and spoken for 5 seconds, then advances",
    },
    {
      mode: "quiz",
      icon: ListChecks,
      he: "בחירה מתוך 4 תשובות",
      en: "Multiple choice quiz",
      desc_he: "המילה באנגלית – בחר את הפירוש הנכון בעברית",
      desc_en: "The English word – pick the right Hebrew meaning",
    },
    {
      mode: "fill",
      icon: Pencil,
      he: "השלמת אותיות חסרות",
      en: "Fill in missing letters",
      desc_he: "המילה תוצג חלקית – השלם את האותיות החסרות",
      desc_en: "The word is partly shown – fill in the missing letters",
    },
  ] as const;

  return (
    <div className="min-h-screen">
      <AppHeader back={`/words/${level}`} />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-primary/70">
              {t("סט", "Set")} #{set.id}
            </div>
            <h1 className="mt-1 font-display text-2xl font-bold">{set.title}</h1>
          </div>
          <Button
            variant={done ? "default" : "outline"}
            onClick={() => setDone(toggleCompleted(level, setId))}
            className={done ? "bg-success text-success-foreground hover:bg-success/90" : ""}
          >
            {done ? <Check className="size-4" /> : <CircleDot className="size-4" />}
            {done
              ? t("סומן כהושלם – לחץ לביטול", "Marked complete – tap to undo")
              : t("סמן סט זה כהושלם", "Mark this set as completed")}
          </Button>
        </div>

        <div className="grid gap-3">
          {modes.map((m) => (
            <Link
              key={m.mode}
              to="/words/$level/$setId/$mode"
              params={{ level, setId: String(setId), mode: m.mode }}
              className="group flex items-center gap-4 rounded-2xl border-2 border-primary/30 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <div className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground transition group-hover:scale-105">
                <m.icon className="size-6" />
              </div>
              <div>
                <div className="font-display text-lg font-bold">{t(m.he, m.en)}</div>
                <div className="text-sm text-card-foreground/70">{t(m.desc_he, m.desc_en)}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
