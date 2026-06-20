import { createFileRoute } from "@tanstack/react-router";
import AdminPanel from "@/components/AdminPanel";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Control Panel — Fyndbridge ATS" },
      {
        name: "description",
        content:
          "Manage admin access, column visibility, and record locks for the Fyndbridge ATS.",
      },
      { property: "og:title", content: "Admin Control Panel — Fyndbridge ATS" },
      {
        property: "og:description",
        content: "Access control, permissions and record locks for Fyndbridge ATS admins.",
      },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return <AdminPanel />;
}