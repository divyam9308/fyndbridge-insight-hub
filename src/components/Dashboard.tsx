import { useMemo, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Activity,
  ArrowUpRight,
  Award,
  Bell,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  FileSignature,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  billingEntities,
  candidateFunnel,
  candidateStatus,
  candidateTrend,
  clientStatus,
  clientTrend,
  consultantCompare,
  consultantPerformance,
  consultants,
  kpis,
  mandateStatus,
  mandateTrend,
  navItems,
  periods,
  recentActivities,
} from "@/data/dashboardMockData";

const kpiIcons = [Building2, Users, Briefcase];
const activityIcons = [Building2, UserCheck, FileSignature, Briefcase, Award, Clock];
const activityTimes = ["2m ago", "14m ago", "1h ago", "3h ago", "5h ago", "Today"];
const activityGradients = [
  "gradient-primary",
  "gradient-success",
  "gradient-info",
  "gradient-warning",
  "gradient-pink",
  "gradient-teal",
];

function Spark({ data, id }: { data: { i: number; v: number }[]; id: string }) {
  return (
    <ResponsiveContainer width="100%" height={42}>
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity={0.55} />
            <stop offset="100%" stopColor="white" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke="white" strokeWidth={2} fill={`url(#${id})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
  right,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="gradient-primary shadow-pop flex h-9 w-9 items-center justify-center rounded-xl text-white">
          <Icon className="h-[18px] w-[18px]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
          {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {right}
    </div>
  );
}

export default function Dashboard() {
  const [consultant, setConsultant] = useState(consultants[0]);
  const [period, setPeriod] = useState(periods[0]);
  const [openDD, setOpenDD] = useState(false);
  const [activeKpi, setActiveKpi] = useState<number | null>(null);
  const [spinning, setSpinning] = useState<number | null>(null);

  const totalClients = useMemo(() => clientStatus.reduce((sum, item) => sum + item.value, 0), []);
  const totalCandidates = useMemo(() => candidateStatus.reduce((sum, item) => sum + item.value, 0), []);
  const totalMandates = useMemo(() => mandateStatus.reduce((sum, item) => sum + item.value, 0), []);
  const maxAdded = Math.max(...consultantPerformance.map((item) => item.added));
  const maxHired = Math.max(...consultantPerformance.map((item) => item.hired));

  return (
    <div className="min-h-screen w-full">
      <header className="sticky top-0 z-30 border-b border-border bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="gradient-primary shadow-pop flex h-9 w-9 items-center justify-center rounded-xl text-white">
              <Zap size={18} strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-bold tracking-tight">
                Fyndbridge<span className="text-primary"> ATS</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Executive Dashboard
              </div>
            </div>
          </div>

          <div className="ml-6 hidden w-80 items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 py-2 md:flex">
            <Search size={15} className="text-muted-foreground" />
            <input
              placeholder="Search clients, candidates, mandates..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
              Ctrl+K
            </kbd>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary/60 transition hover:bg-secondary">
              <Bell size={16} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary/60 transition hover:bg-secondary">
              <Settings size={16} />
            </button>
            <div className="gradient-primary shadow-pop flex items-center gap-2 rounded-xl px-2 py-1.5 pr-3 text-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-xs font-semibold">
                DA
              </div>
              <div className="text-xs leading-tight">
                <div className="font-semibold">Divyam A.</div>
                <div className="opacity-80">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {navItems.map((item, index) => (
            <div
              key={item}
              className={`rounded-xl border border-border px-3 py-2 text-xs font-medium shadow-soft ${
                index === 0 ? "gradient-primary text-white" : "bg-card text-muted-foreground"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Good morning, Divyam</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Recruitment overview for <span className="font-medium text-foreground">{consultant}</span> -{" "}
              <span className="font-medium text-foreground">{period}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setOpenDD((open) => !open)}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium shadow-soft transition hover:shadow-card"
              >
                <div className="gradient-primary flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white">
                  {consultant === consultants[0]
                    ? "All"
                    : consultant
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                </div>
                {consultant}
                <ChevronDown size={14} className="text-muted-foreground" />
              </button>
              {openDD ? (
                <div className="shadow-pop absolute right-0 z-40 mt-2 w-64 rounded-xl border border-border bg-card p-1.5">
                  {consultants.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setConsultant(item);
                        setOpenDD(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-secondary ${
                        item === consultant ? "bg-secondary font-medium" : ""
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex items-center rounded-xl border border-border bg-card p-1 shadow-soft">
              {periods.map((item) => (
                <button
                  key={item}
                  onClick={() => setPeriod(item)}
                  className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    period === item
                      ? "gradient-primary shadow-pop text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {kpis.map((item, index) => {
            const Icon = kpiIcons[index];
            const textClass = "text-white";
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setSpinning(index);
                  window.setTimeout(() => {
                    setActiveKpi(index);
                    setSpinning(null);
                  }, 650);
                }}
                className={`kpi-3d ${item.gradient} relative rounded-2xl p-4 text-left ${textClass} ${
                  spinning === index ? "kpi-flip" : ""
                } cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`}
              >
                <div className="relative z-10 flex items-start justify-between">
                  <div className="animate-float flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur bg-white/20">
                    <Icon size={20} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      item.up ? "bg-white/25" : "bg-black/20"
                    }`}
                  >
                    {item.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {item.delta}
                  </span>
                </div>
                <div className="relative z-10 mt-3">
                  <div className="text-2xl font-bold tracking-tight">{item.value}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-wider opacity-90">{item.label}</div>
                </div>
                <div className="relative z-10 mt-2 -mx-1">
                  <Spark data={item.data} id={`spark-${index}`} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="card-3d col-span-12 rounded-2xl p-5 xl:col-span-5">
            <SectionTitle
              icon={Building2}
              title="Clients Analytics"
              subtitle="Clients by Status"
              right={
                <span className="text-xs text-muted-foreground">
                  Total <span className="font-semibold text-foreground">{totalClients}</span>
                </span>
              }
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="relative h-[260px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={clientStatus}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {clientStatus.map((item) => (
                        <Cell key={item.name} fill={item.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Active</div>
                  <div className="text-2xl font-bold">142</div>
                  <div className="text-[10px] font-semibold text-success">43.6%</div>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                {clientStatus.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-secondary/60"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                      <span className="text-foreground">{item.name}</span>
                    </div>
                    <span className="tabular-nums font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card-3d col-span-12 rounded-2xl p-5 md:col-span-6 xl:col-span-3">
            <SectionTitle
              icon={FileSignature}
              title="Active Clients with Contract Signed"
              subtitle="Billing entity split"
            />
            <div className="grid grid-cols-1 gap-3">
              {billingEntities.map((item) => (
                <div key={item.label} className={`kpi-3d ${item.gradient} rounded-xl p-4 text-white`}>
                  <div className="text-[11px] uppercase tracking-wider opacity-90">{item.label}</div>
                  <div className="mt-1 text-3xl font-bold">{item.value}</div>
                  <div className="mt-0.5 text-xs opacity-90">{item.split} of signed</div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/25">
                    <div className="shimmer h-full bg-white" style={{ width: item.split }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-border bg-secondary/60 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Total contracts signed</span>
                <span className="font-semibold">142</span>
              </div>
            </div>
          </div>

          <div className="card-3d col-span-12 rounded-2xl p-5 md:col-span-6 xl:col-span-4">
            <SectionTitle
              icon={TrendingUp}
              title="Client Acquisition Trend"
              subtitle="Active vs converted clients"
            />
            <div className="h-[260px]">
              <ResponsiveContainer>
                <AreaChart data={clientTrend}>
                  <defs>
                    <linearGradient id="clients-active" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="clients-converted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <Area type="monotone" dataKey="active" name="Active" stroke="var(--chart-1)" fill="url(#clients-active)" strokeWidth={3} />
                  <Area type="monotone" dataKey="converted" name="Converted" stroke="var(--chart-3)" fill="url(#clients-converted)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="card-3d col-span-12 rounded-2xl p-5 xl:col-span-4">
            <SectionTitle
              icon={Users}
              title="Candidates Analytics"
              subtitle="Candidates by Status"
              right={
                <span className="text-xs text-muted-foreground">
                  Total <span className="font-semibold text-foreground">{totalCandidates}</span>
                </span>
              }
            />
            <div className="space-y-2">
              {candidateStatus.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-3 py-2 text-xs">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
                    <span className="truncate text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="tabular-nums font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-3d col-span-12 rounded-2xl p-5 xl:col-span-4">
            <SectionTitle
              icon={Activity}
              title="Candidate Movement Trend"
              subtitle="Candidate submissions vs hires"
            />
            <div className="h-[320px]">
              <ResponsiveContainer>
                <LineChart data={candidateTrend}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <Line type="monotone" dataKey="movement" name="Client Submission" stroke="var(--chart-2)" strokeWidth={3} dot={{ r: 3, fill: "var(--chart-2)" }} />
                  <Line type="monotone" dataKey="hired" name="Hired" stroke="var(--chart-6)" strokeWidth={3} dot={{ r: 3, fill: "var(--chart-6)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-3d col-span-12 rounded-2xl p-5 xl:col-span-4">
            <SectionTitle icon={Target} title="Candidate Funnel" subtitle="ATS stage progression" />
            <div className="mt-2 space-y-2">
              {candidateFunnel.map((item, index) => {
                const width = 100 - index * 13;
                return (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-28 text-right text-[11px] text-muted-foreground">{item.name}</div>
                    <div
                      className="relative flex h-9 flex-1 items-center overflow-hidden rounded-lg px-3 text-xs font-semibold text-white shadow-pop"
                      style={{
                        width: `${width}%`,
                        background: `linear-gradient(135deg, ${item.color}, color-mix(in oklab, ${item.color} 55%, white))`,
                      }}
                    >
                      <span className="relative z-10">{item.value}</span>
                      <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-secondary/60 p-3 text-xs">
              <span className="text-muted-foreground">Interested to hired conversion</span>
              <span className="font-bold text-success">16.8%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="card-3d col-span-12 rounded-2xl p-5 md:col-span-6 xl:col-span-4">
            <SectionTitle
              icon={Briefcase}
              title="Mandates Analytics"
              subtitle="Mandates by Status"
              right={
                <span className="text-xs text-muted-foreground">
                  Total <span className="font-semibold text-foreground">{totalMandates}</span>
                </span>
              }
            />
            <div className="relative h-[220px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={mandateStatus}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {mandateStatus.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                </PieChart>
              </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Mandates</div>
                  <div className="text-2xl font-bold">103</div>
                </div>
            </div>
            <div className="space-y-1.5 text-xs">
              {mandateStatus.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg bg-secondary/40 px-2 py-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-3d col-span-12 rounded-2xl p-5 md:col-span-6 xl:col-span-4">
            <SectionTitle icon={TrendingUp} title="Mandates Trend" subtitle="Ongoing, completed, and scrapped mandates" />
            <div className="h-[300px]">
              <ResponsiveContainer>
                <BarChart data={mandateTrend} barGap={4}>
                  <defs>
                    <linearGradient id="mandates-ongoing" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" />
                      <stop offset="100%" stopColor="var(--chart-6)" />
                    </linearGradient>
                    <linearGradient id="mandates-completed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-3)" />
                      <stop offset="100%" stopColor="var(--chart-2)" />
                    </linearGradient>
                    <linearGradient id="mandates-scrapped" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-5)" />
                      <stop offset="100%" stopColor="var(--chart-4)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <Bar dataKey="ongoing" name="Ongoing" fill="url(#mandates-ongoing)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="completed" name="Completed" fill="url(#mandates-completed)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="scrapped" name="Scrapped" fill="url(#mandates-scrapped)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-3d col-span-12 rounded-2xl p-5 xl:col-span-4">
            <SectionTitle icon={CheckCircle2} title="Mandates Status Split" subtitle="Current mandate pipeline" />
            <div className="grid grid-cols-2 gap-3">
              <div className="kpi-3d gradient-primary rounded-xl p-4 text-white">
                <div className="text-[11px] uppercase opacity-90">Ongoing</div>
                <div className="mt-1 text-4xl font-bold">103</div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <TrendingUp size={12} /> Active mandates
                </div>
              </div>
              <div className="kpi-3d gradient-success rounded-xl p-4 text-white">
                <div className="text-[11px] uppercase opacity-90">Completed + Scrapped</div>
                <div className="mt-1 text-4xl font-bold">61</div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <TrendingUp size={12} /> Finalized mandates
                </div>
              </div>
            </div>
            <div className="mt-4 h-[130px]">
              <ResponsiveContainer>
                <RadialBarChart
                  innerRadius="40%"
                  outerRadius="100%"
                  data={[
                    { name: "Completed + Scrapped", value: 37, fill: "var(--chart-3)" },
                    { name: "Ongoing", value: 63, fill: "var(--chart-1)" },
                  ]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "var(--secondary)" }} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="-mt-2 text-center text-xs text-muted-foreground">
              Ongoing share <span className="font-bold text-foreground">63%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="card-3d col-span-12 rounded-2xl p-5 xl:col-span-7">
            <SectionTitle
              icon={Award}
              title="Consultant Performance"
              subtitle="Candidates Added, Candidates Hired, Mandates Managed, Active Clients"
            />
            <div className="space-y-3">
              {consultantPerformance.map((item, index) => (
                <div key={item.name} className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-secondary/60">
                  <div className="w-6 text-center text-xs font-bold text-muted-foreground">#{index + 1}</div>
                  <div className={`shadow-pop flex h-10 w-10 items-center justify-center rounded-xl ${item.grad} text-sm font-bold text-white`}>
                    {item.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.clients} active clients - {item.mandates} mandates managed
                      </div>
                    </div>
                    <div className="mt-1.5 grid grid-cols-2 gap-2">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>Candidates Added</span>
                          <span className="font-semibold text-foreground">{item.added}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                          <div className={`${item.grad} shimmer h-full`} style={{ width: `${(item.added / maxAdded) * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>Candidates Hired</span>
                          <span className="font-semibold text-foreground">{item.hired}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                          <div className="gradient-success h-full" style={{ width: `${(item.hired / maxHired) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-3d col-span-12 rounded-2xl p-5 xl:col-span-5">
            <SectionTitle icon={Activity} title="Consultant Performance" subtitle="Consultant comparison" />
            <div className="h-[320px]">
              <ResponsiveContainer>
                <BarChart data={consultantCompare}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <Bar dataKey="Candidates Added" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Candidates Hired" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Mandates Managed" fill="var(--chart-4)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Active Clients" fill="var(--chart-6)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="card-3d col-span-12 rounded-2xl p-5 xl:col-span-5">
            <SectionTitle icon={Target} title="Clients by Status" subtitle="Client status mix" />
            <div className="mt-2 space-y-2.5">
              {clientStatus.map((item, index) => {
                const width = 100 - index * 8;
                return (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-32 text-right text-[11px] text-muted-foreground">{item.name}</div>
                    <div
                      className="relative flex h-10 flex-1 items-center overflow-hidden rounded-xl px-3 font-semibold text-white shadow-pop"
                      style={{
                        width: `${width}%`,
                        background: `linear-gradient(135deg, ${item.color}, color-mix(in oklab, ${item.color} 60%, white))`,
                      }}
                    >
                      <span className="relative z-10 text-sm">{item.value}</span>
                      <ArrowUpRight size={14} className="relative z-10 ml-auto opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-3d col-span-12 rounded-2xl p-5 xl:col-span-4">
            <SectionTitle icon={Activity} title="Recent Activity" subtitle="Live updates across the team" />
            <div className="relative pl-4">
              <div className="absolute bottom-1 left-[7px] top-1 w-px bg-border" />
              <div className="space-y-3">
                {recentActivities.map((item, index) => {
                  const Icon = activityIcons[index];
                  return (
                    <div key={item} className="relative flex items-start gap-3">
                      <div className={`shadow-pop absolute -left-[14px] top-1 h-3.5 w-3.5 rounded-full ${activityGradients[index]} ring-4 ring-background`} />
                      <div className={`shadow-pop flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${activityGradients[index]} text-white`}>
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1 rounded-xl border border-border bg-secondary/50 p-2.5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm">{item}</div>
                          <div className="ml-2 whitespace-nowrap text-[11px] text-muted-foreground">
                            {activityTimes[index]}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card-3d col-span-12 rounded-2xl p-5 xl:col-span-3">
            <SectionTitle icon={Sparkles} title="Placement Overview" subtitle="Quick ATS actions" />
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Add Client", icon: Building2, grad: "gradient-primary" },
                { label: "Add Candidate", icon: UserPlus, grad: "gradient-info" },
                { label: "Add Mandate", icon: Briefcase, grad: "gradient-warning" },
                { label: "Export Report", icon: Download, grad: "gradient-success" },
              ].map((item) => (
                <button key={item.label} className={`kpi-3d ${item.grad} group rounded-xl p-4 text-left text-white`}>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 transition group-hover:scale-110">
                    <item.icon size={18} />
                  </div>
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-[11px] opacity-90">
                    Open <ArrowUpRight size={11} />
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
              Tip: sample ATS metrics and labels only. No live backend data is connected.
            </div>
          </div>
        </div>

        <footer className="py-4 text-center text-[11px] text-muted-foreground">
          (c) 2026 Fyndbridge ATS - Executive Dashboard - All figures shown are sample data
        </footer>
      </main>

      <Dialog open={activeKpi !== null} onOpenChange={(open) => !open && setActiveKpi(null)}>
        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
          {activeKpi !== null ? (() => {
            const item = kpis[activeKpi];
            const Icon = kpiIcons[activeKpi];
            const textClass = "text-white";
            return (
              <div
                key={activeKpi}
                className={`animate-spin-360 kpi-3d ${item.gradient} rounded-3xl p-8 ${textClass}`}
              >
                <DialogTitle className="sr-only">{item.label}</DialogTitle>
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl backdrop-blur bg-white/20">
                    <Icon size={28} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${
                      item.up ? "bg-white/25" : "bg-black/20"
                    }`}
                  >
                    {item.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {item.delta} vs last period
                  </span>
                </div>

                <div className="relative z-10 mt-6">
                  <div className="text-[11px] uppercase tracking-[0.2em] opacity-80">{item.label}</div>
                  <div className="mt-2 text-6xl font-bold tracking-tight">{item.value}</div>
                </div>

                <div className="relative z-10 mt-6 grid grid-cols-3 gap-3">
                  {[
                    { k: "This week", v: "+24" },
                    { k: "This month", v: item.value },
                    { k: "Goal", v: "92%" },
                  ].map((stat) => (
                    <div
                      key={stat.k}
                      className="rounded-2xl p-4 backdrop-blur bg-white/15"
                    >
                      <div className="text-[10px] uppercase tracking-wider opacity-80">{stat.k}</div>
                      <div className="mt-1 text-2xl font-bold">{stat.v}</div>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 mt-6 h-[220px] rounded-2xl bg-white/10 p-3 backdrop-blur">
                  <ResponsiveContainer>
                    <AreaChart data={item.data} margin={{ top: 6, right: 6, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id={`modal-spark-${activeKpi}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="white" stopOpacity={0.55} />
                          <stop offset="100%" stopColor="white" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="white"
                        strokeWidth={3}
                        fill={`url(#modal-spark-${activeKpi})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })() : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
