import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/components/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fyndbridge ATS - Executive Dashboard" },
      {
        name: "description",
        content:
          "Premium recruitment ATS dashboard for clients, candidates, mandates and consultant performance.",
      },
      { property: "og:title", content: "Fyndbridge ATS" },
      { property: "og:description", content: "Executive recruitment analytics dashboard." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Dashboard />;
}
