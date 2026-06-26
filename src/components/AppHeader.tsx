import { Link } from "@tanstack/react-router";
import { Languages, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function AppHeader({ back, title }: { back?: string; title?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <header className="sticky top-0 z-30 border-b border-primary/20 bg-primary text-primary-foreground shadow-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          {back && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to={back as never} aria-label={t("חזרה", "Back")}>
                <ArrowRight className={lang === "he" ? "" : "rotate-180"} />
              </Link>
            </Button>
          )}
          <Link to="/" className="font-display text-xl font-bold tracking-tight">
            TechLingo
          </Link>
        </div>
        {title && <h1 className="hidden text-sm font-medium opacity-80 sm:block">{title}</h1>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLang(lang === "he" ? "en" : "he")}
          className="gap-2 text-primary-foreground hover:bg-primary-foreground/10"
          aria-label={t("שנה שפה", "Toggle language")}
        >
          <Languages className="size-4" />
          <span className="text-xs font-semibold">{lang === "he" ? "EN" : "עב"}</span>
        </Button>
      </div>
    </header>
  );
}
