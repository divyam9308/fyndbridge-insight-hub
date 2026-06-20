import { useMemo, useState } from "react";
import {
  Shield,
  ShieldCheck,
  UserPlus,
  Trash2,
  Mail,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Edit3,
  Briefcase,
  Users,
  FileText,
  AlertCircle,
  Save,
  Search,
  Settings,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Brand tokens (inline so this page is independent of dashboard theme) */
/* ------------------------------------------------------------------ */
const NAVY = "#001264";
const NAVY_DEEP = "#000B3D";
const NAVY_SOFT = "#13277A";
const GOLD = "#DAB111";
const GOLD_HOVER = "#C29B0D";
const GOLD_TINT = "#FFF6D6";
const SURFACE = "#F6F7FB";

/* ------------------------------------------------------------------ */
/* Dummy data                                                          */
/* ------------------------------------------------------------------ */
type Admin = { id: string; name: string; email: string; addedOn: string };

const INITIAL_ADMINS: Admin[] = [
  { id: "a1", name: "Aarav Mehta", email: "aarav.mehta@fyndbridge.com", addedOn: "12 Mar 2026" },
  { id: "a2", name: "Priya Sharma", email: "priya.sharma@fyndbridge.com", addedOn: "02 Apr 2026" },
  { id: "a3", name: "Rohan Kapoor", email: "rohan.kapoor@fyndbridge.com", addedOn: "18 May 2026" },
  { id: "a4", name: "Neha Iyer", email: "neha.iyer@fyndbridge.com", addedOn: "01 Jun 2026" },
];

type Perm = "everyone" | "disabled" | "hidden";
type ColumnRow = { key: string; label: string; perm: Perm };

const CLIENT_COLUMNS = [
  "Client Name", "Location", "Region", "Contact Person", "Mobile", "Email",
  "LinkedIn", "Sector", "Consultant", "Follow Up Date", "Status", "Terms Signed",
  "GSTIN", "PAN", "Contract Document", "Value", "Comments",
];
const CANDIDATE_COLUMNS = [
  "Candidate Name", "Consultant", "Email", "Mobile", "Designation", "Organization",
  "Experience", "Client Name", "Role", "Skills", "Current CTC", "Expected CTC",
  "Location", "Notice Period", "Status", "LinkedIn", "CV", "Comments",
];
const MANDATE_COLUMNS = [
  "Job ID", "Consultant", "Team Lead", "Client Name", "Role", "Location",
  "Budget", "Experience", "Sector", "Date of Allocation", "JD", "Status", "Comments",
];

const seedRows = (cols: string[]): ColumnRow[] =>
  cols.map((c, i) => ({
    key: c.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
    label: c,
    perm: i % 7 === 0 ? "hidden" : i % 5 === 0 ? "disabled" : "everyone",
  }));

type LockedRecord = {
  type: "Client" | "Candidate" | "Mandate";
  name: string;
  id: string;
  lockedBy: string;
  lockedDate: string;
};

const LOCKED: LockedRecord[] = [
  { type: "Client", name: "Helix BioPharma Ltd.", id: "CL-10241", lockedBy: "Aarav Mehta", lockedDate: "18 Jun 2026" },
  { type: "Candidate", name: "Vikram Singh", id: "CN-55203", lockedBy: "Priya Sharma", lockedDate: "17 Jun 2026" },
  { type: "Mandate", name: "VP Engineering — Northwind", id: "MD-7781", lockedBy: "Rohan Kapoor", lockedDate: "15 Jun 2026" },
  { type: "Candidate", name: "Anita Verma", id: "CN-55129", lockedBy: "Neha Iyer", lockedDate: "14 Jun 2026" },
  { type: "Client", name: "Zentra Logistics", id: "CL-10198", lockedBy: "Aarav Mehta", lockedDate: "11 Jun 2026" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function AdminPanel() {
  const [admins, setAdmins] = useState<Admin[]>(INITIAL_ADMINS);
  const [email, setEmail] = useState("");
  const [tab, setTab] = useState<"clients" | "candidates" | "mandates">("clients");
  const [clientPerms, setClientPerms] = useState<ColumnRow[]>(() => seedRows(CLIENT_COLUMNS));
  const [candidatePerms, setCandidatePerms] = useState<ColumnRow[]>(() => seedRows(CANDIDATE_COLUMNS));
  const [mandatePerms, setMandatePerms] = useState<ColumnRow[]>(() => seedRows(MANDATE_COLUMNS));
  const [locked, setLocked] = useState<LockedRecord[]>(LOCKED);
  const [dirty, setDirty] = useState(false);

  const counts = useMemo(() => {
    return {
      Client: locked.filter((l) => l.type === "Client").length,
      Candidate: locked.filter((l) => l.type === "Candidate").length,
      Mandate: locked.filter((l) => l.type === "Mandate").length,
    };
  }, [locked]);

  const currentRows = tab === "clients" ? clientPerms : tab === "candidates" ? candidatePerms : mandatePerms;
  const setCurrentRows = tab === "clients" ? setClientPerms : tab === "candidates" ? setCandidatePerms : setMandatePerms;

  const updatePerm = (idx: number, perm: Perm) => {
    setCurrentRows((prev) => prev.map((r, i) => (i === idx ? { ...r, perm } : r)));
    setDirty(true);
  };

  const addAdmin = () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) return;
    const name = trimmed
      .split("@")[0]
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());
    setAdmins((p) => [
      { id: crypto.randomUUID(), name, email: trimmed, addedOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
      ...p,
    ]);
    setEmail("");
    setDirty(true);
  };

  const removeAdmin = (id: string) => {
    setAdmins((p) => p.filter((a) => a.id !== id));
    setDirty(true);
  };

  const unlock = (id: string) => {
    setLocked((p) => p.filter((l) => l.id !== id));
    setDirty(true);
  };

  return (
    <div className="min-h-screen pb-32" style={{ background: SURFACE, color: NAVY_DEEP, fontFamily: "'DM Sans', Inter, system-ui, sans-serif" }}>
      {/* Header */}
      <header
        className="relative overflow-hidden border-b"
        style={{
          background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY} 55%, ${NAVY_SOFT} 100%)`,
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: `radial-gradient(800px 300px at 100% 0%, ${GOLD}33, transparent 60%)` }} />
        <div className="mx-auto max-w-7xl px-6 py-10 relative">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_HOVER})` }}
              >
                <Shield className="h-7 w-7" style={{ color: NAVY_DEEP }} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                  Fyndbridge ATS · Security
                </p>
                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
                  Admin Control Panel
                </h1>
                <p className="mt-1.5 text-sm text-white/70">
                  Manage admin access, column visibility, and record locks.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/90 backdrop-blur">
              <ShieldCheck className="h-4 w-4" style={{ color: GOLD }} />
              Signed in as <span className="font-semibold">Super Admin</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* 1. Admin Access */}
        <Section
          icon={<UserPlus className="h-5 w-5" />}
          title="Admin Access"
          subtitle="Grant or revoke administrator privileges for the ATS workspace."
        >
          <div className="grid gap-4 md:grid-cols-[1fr_auto] items-stretch">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: NAVY_SOFT }} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addAdmin()}
                placeholder="Enter admin email address"
                className="w-full rounded-2xl border bg-white pl-11 pr-4 py-3.5 text-sm outline-none transition focus:ring-2"
                style={{ borderColor: "#E2E6F2", color: NAVY_DEEP, boxShadow: "0 1px 2px rgba(0,18,100,0.04)" }}
              />
            </div>
            <button
              onClick={addAdmin}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold shadow-md transition active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_HOVER})`,
                color: NAVY_DEEP,
                boxShadow: `0 8px 20px -8px ${GOLD}80`,
              }}
            >
              <UserPlus className="h-4 w-4" />
              Add Admin
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {admins.map((a) => (
              <div
                key={a.id}
                className="group relative rounded-2xl border bg-white p-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "#E5E8F1",
                  boxShadow: "0 1px 2px rgba(0,18,100,0.04), 0 14px 30px -18px rgba(0,18,100,0.18)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${NAVY}, ${GOLD})` }}
                />
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_SOFT})` }}
                  >
                    {initials(a.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold" style={{ color: NAVY_DEEP }}>
                        {a.name}
                      </p>
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: GOLD_TINT, color: NAVY_DEEP, border: `1px solid ${GOLD}66` }}
                      >
                        Admin
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{a.email}</p>
                    <p className="mt-2 text-[11px] text-slate-400">Added {a.addedOn}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeAdmin(a.id)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition hover:bg-red-50"
                  style={{ borderColor: "#FECACA", color: "#B91C1C" }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Revoke access
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* 2. Column Permissions */}
        <Section
          icon={<Settings className="h-5 w-5" />}
          title="Column Permissions"
          subtitle="Control which columns are visible or editable for non-admin users."
        >
          <div className="flex flex-wrap items-center gap-2 border-b pb-3" style={{ borderColor: "#E5E8F1" }}>
            {(["clients", "candidates", "mandates"] as const).map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="rounded-xl px-4 py-2 text-sm font-medium capitalize transition"
                  style={
                    active
                      ? { background: NAVY, color: "white", boxShadow: `0 8px 18px -10px ${NAVY}` }
                      : { color: NAVY_SOFT, background: "transparent" }
                  }
                >
                  {t}
                </button>
              );
            })}
            <div className="ml-auto hidden items-center gap-4 text-[11px] text-slate-500 md:flex">
              <LegendDot color="#16A34A" label="Everyone" />
              <LegendDot color={GOLD} label="Disabled" />
              <LegendDot color={NAVY} label="Hidden" />
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border" style={{ borderColor: "#E5E8F1" }}>
            <div
              className="grid grid-cols-[2fr_3fr] gap-2 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider"
              style={{ background: "#F8F9FD", color: NAVY_SOFT }}
            >
              <div>Column</div>
              <div>Permission</div>
            </div>
            <div>
              {currentRows.map((row, i) => (
                <div
                  key={row.key}
                  className="grid grid-cols-[2fr_3fr] items-center gap-2 border-t px-4 py-3 transition hover:bg-slate-50/60"
                  style={{ borderColor: "#EEF1F7" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background:
                          row.perm === "everyone" ? "#16A34A" : row.perm === "disabled" ? GOLD : NAVY,
                      }}
                    />
                    <span className="text-sm font-medium" style={{ color: NAVY_DEEP }}>
                      {row.label}
                    </span>
                  </div>
                  <PermPills value={row.perm} onChange={(p) => updatePerm(i, p)} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Hint color="#16A34A" title="Everyone" desc="Visible and editable by all users." />
            <Hint color={GOLD} title="Admin Only — Disabled" desc="Visible but not editable by non-admins." />
            <Hint color={NAVY} title="Admin Only — Hidden" desc="Not visible to non-admins." />
          </div>
        </Section>

        {/* 3. Record Lock Controls */}
        <Section
          icon={<Lock className="h-5 w-5" />}
          title="Record Lock Controls"
          subtitle="Records locked by admins cannot be edited by other users until released."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <LockSummary icon={<Briefcase className="h-5 w-5" />} label="Locked Clients" count={counts.Client} />
            <LockSummary icon={<Users className="h-5 w-5" />} label="Locked Candidates" count={counts.Candidate} />
            <LockSummary icon={<FileText className="h-5 w-5" />} label="Locked Mandates" count={counts.Mandate} />
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border" style={{ borderColor: "#E5E8F1" }}>
            <div className="flex items-center justify-between gap-4 px-4 py-3" style={{ background: "#F8F9FD" }}>
              <p className="text-sm font-semibold" style={{ color: NAVY_DEEP }}>
                Currently locked records
              </p>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  placeholder="Search records"
                  className="w-56 rounded-lg border bg-white py-1.5 pl-8 pr-3 text-xs outline-none"
                  style={{ borderColor: "#E5E8F1", color: NAVY_DEEP }}
                />
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: NAVY_SOFT, background: "#FBFCFE" }}>
                  <th className="px-4 py-2.5">Type</th>
                  <th className="px-4 py-2.5">Record Name</th>
                  <th className="px-4 py-2.5">ID</th>
                  <th className="px-4 py-2.5">Locked By</th>
                  <th className="px-4 py-2.5">Locked Date</th>
                  <th className="px-4 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {locked.map((r) => (
                  <tr key={r.id} className="border-t" style={{ borderColor: "#EEF1F7" }}>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                        style={{ background: "#EEF2FF", color: NAVY }}
                      >
                        <Lock className="h-3 w-3" />
                        {r.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium" style={{ color: NAVY_DEEP }}>{r.name}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{r.id}</td>
                    <td className="px-4 py-3 text-slate-600">{r.lockedBy}</td>
                    <td className="px-4 py-3 text-slate-500">{r.lockedDate}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => unlock(r.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:bg-amber-50"
                        style={{ borderColor: `${GOLD}66`, color: NAVY_DEEP, background: GOLD_TINT }}
                      >
                        <Unlock className="h-3.5 w-3.5" />
                        Unlock
                      </button>
                    </td>
                  </tr>
                ))}
                {locked.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">
                      No records are currently locked.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 4. Preview of Actions Column */}
        <Section
          icon={<Eye className="h-5 w-5" />}
          title="How locking appears in tables"
          subtitle="Preview of the Actions column for admin and non-admin users."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <PreviewTable
              label="Admin view"
              accent={NAVY}
              row={
                <>
                  <ActionBtn icon={<Edit3 className="h-3.5 w-3.5" />} label="Edit" />
                  <ActionBtn icon={<Trash2 className="h-3.5 w-3.5" />} label="Delete" tone="danger" />
                  <ActionBtn icon={<Lock className="h-3.5 w-3.5" />} label="Lock" tone="gold" />
                </>
              }
            />
            <PreviewTable
              label="Non-admin view (record locked)"
              accent={GOLD}
              row={
                <>
                  <ActionBtn icon={<Edit3 className="h-3.5 w-3.5" />} label="Edit" disabled />
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                    style={{ background: GOLD_TINT, color: NAVY_DEEP, border: `1px solid ${GOLD}66` }}
                  >
                    <Lock className="h-3.5 w-3.5" /> Locked
                  </span>
                </>
              }
            />
          </div>
        </Section>
      </main>

      {/* 5. Sticky save footer */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur"
        style={{
          background: "rgba(255,255,255,0.92)",
          borderColor: "#E5E8F1",
          boxShadow: "0 -10px 30px -12px rgba(0,18,100,0.15)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4" style={{ color: dirty ? GOLD_HOVER : "#94A3B8" }} />
            <span style={{ color: dirty ? NAVY_DEEP : "#64748B" }}>
              {dirty ? "You have unsaved permission changes" : "All changes saved"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDirty(false)}
              className="rounded-xl border px-4 py-2 text-sm font-semibold transition hover:bg-slate-50"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              Cancel
            </button>
            <button
              onClick={() => setDirty(false)}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold shadow transition active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_HOVER})`,
                color: NAVY_DEEP,
                boxShadow: `0 10px 22px -10px ${GOLD}99`,
              }}
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */
function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-3xl border bg-white p-6 sm:p-7"
      style={{
        borderColor: "#E5E8F1",
        boxShadow: "0 1px 2px rgba(0,18,100,0.04), 0 24px 50px -28px rgba(0,18,100,0.18)",
      }}
    >
      <div className="mb-5 flex items-start gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: "#EEF2FF", color: NAVY }}
        >
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight" style={{ color: NAVY_DEEP }}>
            {title}
          </h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function PermPills({ value, onChange }: { value: Perm; onChange: (p: Perm) => void }) {
  const opts: { key: Perm; label: string; color: string; icon: React.ReactNode }[] = [
    { key: "everyone", label: "Everyone", color: "#16A34A", icon: <Eye className="h-3 w-3" /> },
    { key: "disabled", label: "Disabled", color: GOLD, icon: <Lock className="h-3 w-3" /> },
    { key: "hidden", label: "Hidden", color: NAVY, icon: <EyeOff className="h-3 w-3" /> },
  ];
  return (
    <div className="flex flex-wrap gap-1.5">
      {opts.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition"
            style={
              active
                ? { background: o.color, color: o.key === "disabled" ? NAVY_DEEP : "white", boxShadow: `0 6px 14px -8px ${o.color}` }
                : { background: "#F3F4F8", color: "#64748B", border: "1px solid transparent" }
            }
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Hint({ color, title, desc }: { color: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border bg-white p-3" style={{ borderColor: "#EEF1F7" }}>
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
        <p className="text-xs font-semibold" style={{ color: NAVY_DEEP }}>{title}</p>
      </div>
      <p className="mt-1 text-[11px] text-slate-500">{desc}</p>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function LockSummary({ icon, label, count }: { icon: React.ReactNode; label: string; count: number }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 text-white"
      style={{
        background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY} 60%, ${NAVY_SOFT} 100%)`,
        boxShadow: "0 14px 30px -16px rgba(0,18,100,0.55)",
      }}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full" style={{ background: `${GOLD}22` }} />
      <div className="relative flex items-center justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${GOLD}22`, color: GOLD }}
        >
          {icon}
        </div>
        <Lock className="h-4 w-4" style={{ color: GOLD }} />
      </div>
      <p className="relative mt-4 text-3xl font-semibold tracking-tight">{count}</p>
      <p className="relative text-sm text-white/75">{label}</p>
      <button
        className="relative mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
      >
        View locked records →
      </button>
    </div>
  );
}

function PreviewTable({ label, accent, row }: { label: string; accent: string; row: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "#E5E8F1" }}>
      <div
        className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold"
        style={{ background: "#F8F9FD", color: NAVY_DEEP, borderBottom: `2px solid ${accent}` }}
      >
        <span>{label}</span>
        <span className="text-[10px] uppercase tracking-wider text-slate-400">Preview</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t" style={{ borderColor: "#EEF1F7" }}>
            <td className="px-4 py-3 font-medium" style={{ color: NAVY_DEEP }}>Ananya Rao</td>
            <td className="px-4 py-3">
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold"
                style={{ background: "#ECFDF5", color: "#047857" }}>
                Shortlisted
              </span>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-2">{row}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  disabled,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  tone?: "danger" | "gold";
}) {
  const baseStyle: React.CSSProperties = disabled
    ? { background: "#F3F4F8", color: "#94A3B8", borderColor: "#E5E8F1" }
    : tone === "danger"
    ? { background: "#FEF2F2", color: "#B91C1C", borderColor: "#FECACA" }
    : tone === "gold"
    ? { background: GOLD_TINT, color: NAVY_DEEP, borderColor: `${GOLD}66` }
    : { background: "white", color: NAVY_DEEP, borderColor: "#E5E8F1" };
  return (
    <button
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed"
      style={baseStyle}
    >
      {icon}
      {label}
    </button>
  );
}