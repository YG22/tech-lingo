import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ClipboardCheck, Code2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { t } = useLang();
  const items = [
    {
      to: "/words",
      icon: BookOpen,
      he: "תרגול מילים באנגלית טכנית",
      en: "Tech English Vocabulary",
      desc_he: "150+ מילים מסודרות בסטים לפי דרגות קושי, עם השמעה וחידונים",
      desc_en: "150+ words in graded sets with pronunciation and quizzes",
    },
    {
      to: "/qa",
      icon: ClipboardCheck,
      he: "תרגול שאלות ותשובות ב-QA",
      en: "QA Questions & Answers",
      desc_he: "שאלות נפוצות בראיונות QA, מסודרות לפי נושאים",
      desc_en: "Common QA interview questions organized by topic",
    },
    {
      to: "/software",
      icon: Code2,
      he: "תרגול שאלות ותשובות בתוכנה",
      en: "Software Questions & Answers",
      desc_he: "מושגי תוכנה, OOP, מסדי נתונים, רשתות ו-DevOps",
      desc_en: "Software concepts, OOP, databases, networking and DevOps",
    },
  ];

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Word Tech
          </h1>
          <p className="mt-2 text-sm text-foreground/70 sm:text-base">
            {t(
              "תרגול מילים באנגלית טכנית, שאלות ב-QA ובתוכנה – הכל במקום אחד",
              "Practice tech English vocabulary, QA and software Q&A – all in one place",
            )}
          </p>
        </div>

        <div className="grid gap-4">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="group rounded-2xl border-2 border-primary/30 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition group-hover:scale-105">
                  <it.icon className="size-7" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-bold text-card-foreground">
                    {t(it.he, it.en)}
                  </h2>
                  <p className="mt-1 text-sm text-card-foreground/70">
                    {t(it.desc_he, it.desc_en)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
