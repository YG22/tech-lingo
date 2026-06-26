import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { SOFTWARE_TOPICS } from "@/data/qa";
import { QADeck } from "@/components/QADeck";

export const Route = createFileRoute("/software/$topic")({
  loader: ({ params }) => {
    const t = SOFTWARE_TOPICS.find((x) => x.id === params.topic);
    if (!t) throw notFound();
    return { topic: t };
  },
  component: View,
  notFoundComponent: () => <div className="p-8 text-center">Topic not found</div>,
});

function View() {
  const { topic } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <AppHeader back="/software" />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <QADeck topic={topic} />
      </main>
    </div>
  );
}
