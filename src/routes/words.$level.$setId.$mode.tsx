import { createFileRoute, notFound } from "@tanstack/react-router";
import { type Level, getSet } from "@/data/words";
import { LoopMode } from "@/components/word-modes/LoopMode";
import { QuizMode } from "@/components/word-modes/QuizMode";
import { FillMode } from "@/components/word-modes/FillMode";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/words/$level/$setId/$mode")({
  loader: ({ params }) => {
    const level = params.level as Level;
    const setId = Number(params.setId);
    const set = getSet(level, setId);
    if (!set) throw notFound();
    if (!["loop", "quiz", "fill"].includes(params.mode)) throw notFound();
    return { level, setId, set, mode: params.mode as "loop" | "quiz" | "fill" };
  },
  component: ModeView,
  notFoundComponent: () => <div className="p-8 text-center">Not found</div>,
});

function ModeView() {
  const { level, setId, set, mode } = Route.useLoaderData();
  const back = `/words/${level}/${setId}`;
  return (
    <div className="min-h-screen">
      <AppHeader back={back} />
      <main className="mx-auto max-w-3xl px-4 py-8">
        {mode === "loop" && <LoopMode set={set} />}
        {mode === "quiz" && <QuizMode set={set} />}
        {mode === "fill" && <FillMode set={set} />}
      </main>
    </div>
  );
}
