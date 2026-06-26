import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { useLang } from "@/lib/i18n";
import { SOFTWARE_TOPICS } from "@/data/qa";

export const Route = createFileRoute("/software/")({
  component: Topics,
});

function Topics() {
  const { t } = useLang();
  return (
    <div className="min-h-screen">
      <AppHeader back="/" />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 font-display text-2xl font-bold">
          {t("שאלות ותשובות בתוכנה", "Software Questions & Answers")}
        </h1>
        <p className="mb-4 text-sm text-foreground/70">
          {t("בחר נושא לתרגול", "Pick a topic to practice")}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SOFTWARE_TOPICS.map((tp) => (
            <Link
              key={tp.id}
              to="/software/$topic"
              params={{ topic: tp.id }}
              className="rounded-2xl border-2 border-primary/30 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <div className="font-display text-lg font-bold">
                {t(tp.title_he, tp.title_en)}
              </div>
              <div className="mt-1 text-sm text-card-foreground/70">
                {tp.items.length} {t("שאלות", "questions")}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
