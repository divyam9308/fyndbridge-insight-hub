import { useState } from "react";
import {
  Users, UserCheck, Briefcase, Award, TrendingUp, TrendingDown,
  Building2, FileSignature, UserPlus, FileText, Download, Plus,
  Activity, Clock, CheckCircle2, Target, DollarSign, Sparkles,
  ArrowUpRight, Search, Bell, Settings, ChevronDown, Zap,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line,
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  RadialBarChart, RadialBar,
} from "recharts";

/* ---------- sample data ---------- */
const consultants = ["Overall (All Consultants)", "Divyam Aggarwal", "Rajneesh Sharma", "Ria Ghoshal", "Aarohi Sharma"];
const periods = ["This Month", "Q1", "Q2", "Q3", "Q4", "This Year (YTD)", "Till This Date"];

const sparkA = [4,8,6,10,9,14,12,18,16,22,20,26].map((v,i)=>({i,v}));
const sparkB = [20,18,22,19,24,21,26,23,28,25,30,28].map((v,i)=>({i,v}));
const sparkC = [2,4,3,6,5,8,7,10,9,12,11,14].map((v,i)=>({i,v}));
const sparkD = [10,12,11,14,13,16,15,18,17,20,19,22].map((v,i)=>({i,v}));

const kpis = [
  { label: "Total Clients",    value: "486",   delta: "+12.4%", up: true,  icon: Building2,   gradient: "gradient-primary", data: sparkA },
  { label: "Total Candidates", value: "12,847",delta: "+18.2%", up: true,  icon: Users,       gradient: "gradient-info",    data: sparkB },
  { label: "Total Mandates",   value: "324",   delta: "+6.8%",  up: true,  icon: Briefcase,   gradient: "gradient-warning", data: sparkC },
  { label: "Active Clients",   value: "142",   delta: "+3.1%",  up: true,  icon: CheckCircle2,gradient: "gradient-success", data: sparkD },
  { label: "Active Mandates",  value: "98",    delta: "-2.4%",  up: false, icon: Target,      gradient: "gradient-pink",    data: sparkA },
  { label: "Placements",       value: "207",   delta: "+24.6%", up: true,  icon: Award,       gradient: "gradient-teal",    data: sparkB },
];

const clientStatus = [
  { name: "Active",                value: 142, color: "var(--chart-1)" },
  { name: "Inactive",              value: 58,  color: "var(--chart-7)" },
  { name: "Converted",             value: 68,  color: "var(--chart-3)" },
  { name: "Not Converted",         value: 44,  color: "var(--chart-5)" },
  { name: "Follow Up Required",    value: 52,  color: "var(--chart-4)" },
  { name: "Not Hiring",            value: 38,  color: "var(--chart-2)" },
  { name: "Not Adding Consultants",value: 46,  color: "var(--chart-6)" },
  { name: "Didn't Pick Up",        value: 38,  color: "var(--chart-8)" },
];

const candidateStatus = [
  { name: "Active",               value: 3120, color: "var(--chart-1)" },
  { name: "Interviewing",         value: 1840, color: "var(--chart-2)" },
  { name: "Client Submission",    value: 1420, color: "var(--chart-3)" },
  { name: "Offered",              value: 410,  color: "var(--chart-4)" },
  { name: "Hired",                value: 207,  color: "var(--chart-8)" },
  { name: "Rejected by Recruiter",value: 980,  color: "var(--chart-5)" },
  { name: "Rejected by Client",   value: 1240, color: "var(--chart-6)" },
  { name: "Dropout",              value: 520,  color: "var(--chart-7)" },
  { name: "Offer Declined",       value: 180,  color: "var(--chart-5)" },
  { name: "Not Interested",       value: 930,  color: "var(--chart-2)" },
];

const mandateStatus = [
  { name: "Ongoing",   value: 98,  color: "var(--chart-1)" },
  { name: "Completed", value: 182, color: "var(--chart-3)" },
  { name: "Scrapped",  value: 44,  color: "var(--chart-5)" },
];

const clientTrend = [
  { m:"Jan", v: 24, m2: 14 }, { m:"Feb", v: 31, m2: 18 },
  { m:"Mar", v: 28, m2: 22 }, { m:"Apr", v: 42, m2: 28 },
  { m:"May", v: 38, m2: 26 }, { m:"Jun", v: 52, m2: 34 },
  { m:"Jul", v: 48, m2: 38 }, { m:"Aug", v: 61, m2: 44 },
  { m:"Sep", v: 58, m2: 48 }, { m:"Oct", v: 72, m2: 56 },
  { m:"Nov", v: 68, m2: 62 }, { m:"Dec", v: 84, m2: 70 },
];

const mandateTrend = clientTrend.map(d => ({ m: d.m, open: d.v - 6, closed: d.m2 }));

const funnelClients = [
  { name: "Total Clients",     value: 486, color: "var(--chart-1)" },
  { name: "Active Clients",    value: 142, color: "var(--chart-2)" },
  { name: "Converted",         value: 68,  color: "var(--chart-3)" },
  { name: "Contract Signed",   value: 54,  color: "var(--chart-4)" },
  { name: "Billing Clients",   value: 42,  color: "var(--chart-5)" },
];

const candidateFunnel = [
  { name: "Applied",      value: 12847, color: "var(--chart-1)" },
  { name: "Screened",     value: 7320,  color: "var(--chart-7)" },
  { name: "Submitted",    value: 4180,  color: "var(--chart-2)" },
  { name: "Interviewing", value: 1840,  color: "var(--chart-3)" },
  { name: "Offered",      value: 410,   color: "var(--chart-4)" },
  { name: "Hired",        value: 207,   color: "var(--chart-8)" },
];

const topConsultants = [
  { name: "Divyam Aggarwal",  added: 184, placed: 62, mandates: 28, clients: 18, avatar: "DA", grad: "gradient-primary" },
  { name: "Rajneesh Sharma",  added: 156, placed: 54, mandates: 24, clients: 15, avatar: "RS", grad: "gradient-info" },
  { name: "Ria Ghoshal",      added: 142, placed: 48, mandates: 22, clients: 14, avatar: "RG", grad: "gradient-pink" },
  { name: "Aarohi Sharma",    added: 128, placed: 43, mandates: 19, clients: 12, avatar: "AS", grad: "gradient-teal" },
];

const consultantCompare = topConsultants.map(c => ({
  name: c.name.split(" ")[0], Added: c.added, Placed: c.placed, Mandates: c.mandates,
}));

const placementMetrics = [
  { label: "New Candidates", value: 1284, icon: UserPlus,    grad: "gradient-primary" },
  { label: "Submissions",    value: 642,  icon: FileText,    grad: "gradient-info" },
  { label: "Interviews",     value: 384,  icon: Activity,    grad: "gradient-warning" },
  { label: "Offers",         value: 142,  icon: Award,       grad: "gradient-pink" },
  { label: "Placements",     value: 87,   icon: CheckCircle2,grad: "gradient-success" },
];

const activities = [
  { t:"2m ago", text:"New client onboarded — Acme Capital Pvt Ltd",      type:"client",    color:"gradient-primary", icon: Building2 },
  { t:"14m ago",text:"Candidate hired — Priya Nair → Goldline Finance",  type:"hire",      color:"gradient-success", icon: Award },
  { t:"1h ago", text:"Contract signed — Northstar Tech (FCS)",           type:"contract",  color:"gradient-info",    icon: FileSignature },
  { t:"3h ago", text:"Mandate completed — Senior PM, Bluepeak",          type:"mandate",   color:"gradient-warning", icon: Briefcase },
  { t:"5h ago", text:"23 candidates submitted to Helix Pharma",          type:"submission",color:"gradient-pink",    icon: FileText },
  { t:"Yday",   text:"Quarterly target hit — Ria Ghoshal (105%)",        type:"achieve",   color:"gradient-teal",    icon: Sparkles },
];

/* ---------- helpers ---------- */
function Spark({ data, stroke }: { data: {i:number;v:number}[]; stroke: string }) {
  return (
    <ResponsiveContainer width="100%" height={42}>
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`sp-${stroke}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity={0.55}/>
            <stop offset="100%" stopColor="white" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke="white" strokeWidth={2} fill={`url(#sp-${stroke})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function SectionTitle({ icon: Icon, title, subtitle, right }: any) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white shadow-pop">
          <Icon className="w-4.5 h-4.5" size={18}/>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

/* ---------- main ---------- */
export default function Dashboard() {
  const [consultant, setConsultant] = useState(consultants[0]);
  const [period, setPeriod] = useState("This Year (YTD)");
  const [openDD, setOpenDD] = useState(false);

  const totalCandidates = candidateStatus.reduce((a,b)=>a+b.value,0);

  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-primary shadow-pop flex items-center justify-center text-white">
              <Zap size={18} strokeWidth={2.5}/>
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-bold tracking-tight">Fyndbridge<span className="text-primary"> ATS</span></div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Executive Dashboard</div>
            </div>
          </div>

          <div className="ml-6 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/60 border border-border w-80">
            <Search size={15} className="text-muted-foreground"/>
            <input placeholder="Search clients, candidates, mandates…" className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"/>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">⌘K</kbd>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl bg-secondary/60 border border-border flex items-center justify-center hover:bg-secondary transition">
              <Bell size={16}/>
            </button>
            <button className="w-9 h-9 rounded-xl bg-secondary/60 border border-border flex items-center justify-center hover:bg-secondary transition">
              <Settings size={16}/>
            </button>
            <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl gradient-primary text-white shadow-pop">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-xs font-semibold">DA</div>
              <div className="text-xs leading-tight">
                <div className="font-semibold">Divyam A.</div>
                <div className="opacity-80">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {/* Greeting + Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Good morning, Divyam 👋</h1>
            <p className="text-sm text-muted-foreground mt-1">Here is the performance overview for <span className="font-medium text-foreground">{consultant}</span> · <span className="font-medium text-foreground">{period}</span></p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Consultant dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDD(o=>!o)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border shadow-soft text-sm font-medium hover:shadow-card transition"
              >
                <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center text-white text-[10px] font-bold">
                  {consultant === consultants[0] ? "All" : consultant.split(" ").map(s=>s[0]).join("")}
                </div>
                {consultant}
                <ChevronDown size={14} className="text-muted-foreground"/>
              </button>
              {openDD && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-card border border-border shadow-pop p-1.5 z-40">
                  {consultants.map(c => (
                    <button key={c} onClick={()=>{setConsultant(c); setOpenDD(false);}}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-secondary transition ${c===consultant?"bg-secondary font-medium":""}`}>
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Period segmented */}
            <div className="flex items-center bg-card border border-border rounded-xl p-1 shadow-soft">
              {periods.map(p => (
                <button key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                    period === p ? "gradient-primary text-white shadow-pop" : "text-muted-foreground hover:text-foreground"
                  }`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map(k => (
            <div key={k.label} className={`kpi-3d ${k.gradient} text-white rounded-2xl p-4 relative`}>
              <div className="flex items-start justify-between relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center animate-float">
                  <k.icon size={20}/>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${k.up?"bg-white/25":"bg-black/20"}`}>
                  {k.up ? <TrendingUp size={11}/> : <TrendingDown size={11}/>}
                  {k.delta}
                </span>
              </div>
              <div className="mt-3 relative z-10">
                <div className="text-2xl font-bold tracking-tight">{k.value}</div>
                <div className="text-[11px] opacity-90 uppercase tracking-wider mt-0.5">{k.label}</div>
              </div>
              <div className="mt-2 -mx-1 relative z-10">
                <Spark data={k.data} stroke={k.label}/>
              </div>
            </div>
          ))}
        </div>

        {/* Section 1: Clients */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-5 card-3d rounded-2xl p-5">
            <SectionTitle icon={Building2} title="Clients Overview" subtitle="Status distribution across all clients"
              right={<span className="text-xs text-muted-foreground">Total <span className="font-semibold text-foreground">486</span></span>}/>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[240px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={clientStatus} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2} stroke="none">
                      {clientStatus.map((s,i)=><Cell key={i} fill={s.color}/>)}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius:12, border:"1px solid var(--border)", boxShadow:"var(--shadow-card)"}}/>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Active</div>
                  <div className="text-2xl font-bold">142</div>
                  <div className="text-[10px] text-success font-semibold">+8.2%</div>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                {clientStatus.map(s => (
                  <div key={s.name} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-secondary/60 transition">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{background:s.color, boxShadow:`0 0 0 3px color-mix(in oklab, ${s.color} 18%, transparent)`}}/>
                      <span className="text-foreground">{s.name}</span>
                    </div>
                    <span className="font-semibold tabular-nums">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-3 card-3d rounded-2xl p-5">
            <SectionTitle icon={FileSignature} title="Active Clients · Contract Signed" subtitle="Billing entity breakdown"/>
            <div className="grid grid-cols-2 gap-3">
              <div className="kpi-3d gradient-info rounded-xl p-4 text-white">
                <div className="text-[11px] uppercase tracking-wider opacity-90">FCS</div>
                <div className="text-3xl font-bold mt-1">86</div>
                <div className="text-xs opacity-90 mt-0.5">61% of signed</div>
                <div className="mt-3 h-1.5 rounded-full bg-white/25 overflow-hidden">
                  <div className="h-full bg-white shimmer" style={{width:"61%"}}/>
                </div>
              </div>
              <div className="kpi-3d gradient-pink rounded-xl p-4 text-white">
                <div className="text-[11px] uppercase tracking-wider opacity-90">FCAPL</div>
                <div className="text-3xl font-bold mt-1">56</div>
                <div className="text-xs opacity-90 mt-0.5">39% of signed</div>
                <div className="mt-3 h-1.5 rounded-full bg-white/25 overflow-hidden">
                  <div className="h-full bg-white shimmer" style={{width:"39%"}}/>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-secondary/60 border border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Total contracts signed</span>
                <span className="font-semibold">142</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1.5">
                <span className="text-muted-foreground">Pending signature</span>
                <span className="font-semibold text-warning">18</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-4 card-3d rounded-2xl p-5">
            <SectionTitle icon={TrendingUp} title="Client Acquisition Trend" subtitle="Monthly new vs converted"/>
            <div className="h-[240px]">
              <ResponsiveContainer>
                <AreaChart data={clientTrend}>
                  <defs>
                    <linearGradient id="ct1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.45}/>
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="ct2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.4}/>
                      <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="m" tick={{fontSize:10, fill:"var(--muted-foreground)"}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:10, fill:"var(--muted-foreground)"}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{borderRadius:12, border:"1px solid var(--border)"}}/>
                  <Area type="monotone" dataKey="v"  name="New"       stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#ct1)"/>
                  <Area type="monotone" dataKey="m2" name="Converted" stroke="var(--chart-3)" strokeWidth={2.5} fill="url(#ct2)"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Section 2: Candidates */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-4 card-3d rounded-2xl p-5">
            <SectionTitle icon={Users} title="Candidates Overview" subtitle="Pipeline status distribution"/>
            <div className="relative h-[230px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={candidateStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={92} paddingAngle={2} stroke="none">
                    {candidateStatus.map((s,i)=><Cell key={i} fill={s.color}/>)}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius:12, border:"1px solid var(--border)"}}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div>
                <div className="text-2xl font-bold">{totalCandidates.toLocaleString()}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] mt-2">
              {candidateStatus.map(s => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{background:s.color}}/>
                    <span className="truncate text-muted-foreground">{s.name}</span>
                  </div>
                  <span className="font-semibold tabular-nums">{s.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4 card-3d rounded-2xl p-5">
            <SectionTitle icon={Activity} title="Candidate Activity" subtitle="Additions vs movements"/>
            <div className="h-[300px]">
              <ResponsiveContainer>
                <LineChart data={clientTrend}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="m" tick={{fontSize:10, fill:"var(--muted-foreground)"}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:10, fill:"var(--muted-foreground)"}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{borderRadius:12, border:"1px solid var(--border)"}}/>
                  <Line type="monotone" dataKey="v"  name="Added"     stroke="var(--chart-2)" strokeWidth={3} dot={{r:3, fill:"var(--chart-2)"}}/>
                  <Line type="monotone" dataKey="m2" name="Movements" stroke="var(--chart-6)" strokeWidth={3} dot={{r:3, fill:"var(--chart-6)"}}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4 card-3d rounded-2xl p-5">
            <SectionTitle icon={Target} title="Candidate Funnel" subtitle="Applied → Hired"/>
            <div className="space-y-2 mt-2">
              {candidateFunnel.map((f, i) => {
                const w = 100 - i * 13;
                return (
                  <div key={f.name} className="flex items-center gap-3">
                    <div className="w-20 text-[11px] text-muted-foreground text-right">{f.name}</div>
                    <div className="flex-1 h-9 rounded-lg flex items-center px-3 text-white text-xs font-semibold shadow-pop relative overflow-hidden"
                         style={{
                           width: `${w}%`,
                           background: `linear-gradient(135deg, ${f.color}, color-mix(in oklab, ${f.color} 55%, white))`,
                         }}>
                      <span className="relative z-10">{f.value.toLocaleString()}</span>
                      <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent"/>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-secondary/60 border border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Applied → Hired conversion</span>
              <span className="font-bold text-success">1.61%</span>
            </div>
          </div>
        </div>

        {/* Section 3: Mandates */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 xl:col-span-4 card-3d rounded-2xl p-5">
            <SectionTitle icon={Briefcase} title="Mandates Overview" subtitle="Job opening statuses"/>
            <div className="relative h-[210px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={mandateStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3} stroke="none">
                    {mandateStatus.map((s,i)=><Cell key={i} fill={s.color}/>)}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius:12, border:"1px solid var(--border)"}}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Mandates</div>
                <div className="text-2xl font-bold">324</div>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              {mandateStatus.map(s => (
                <div key={s.name} className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-secondary/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{background:s.color}}/>
                    <span>{s.name}</span>
                  </div>
                  <span className="font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-4 card-3d rounded-2xl p-5">
            <SectionTitle icon={TrendingUp} title="Mandates Trend" subtitle="Monthly activity"/>
            <div className="h-[290px]">
              <ResponsiveContainer>
                <BarChart data={mandateTrend} barGap={4}>
                  <defs>
                    <linearGradient id="mb1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)"/>
                      <stop offset="100%" stopColor="var(--chart-6)"/>
                    </linearGradient>
                    <linearGradient id="mb2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-3)"/>
                      <stop offset="100%" stopColor="var(--chart-2)"/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="m" tick={{fontSize:10, fill:"var(--muted-foreground)"}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:10, fill:"var(--muted-foreground)"}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{borderRadius:12, border:"1px solid var(--border)"}}/>
                  <Bar dataKey="open"   name="Open"   fill="url(#mb1)" radius={[6,6,0,0]}/>
                  <Bar dataKey="closed" name="Closed" fill="url(#mb2)" radius={[6,6,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4 card-3d rounded-2xl p-5">
            <SectionTitle icon={CheckCircle2} title="Open vs Closed" subtitle="Current pipeline"/>
            <div className="grid grid-cols-2 gap-3">
              <div className="kpi-3d gradient-primary rounded-xl p-4 text-white">
                <div className="text-[11px] uppercase opacity-90">Open</div>
                <div className="text-4xl font-bold mt-1">98</div>
                <div className="flex items-center gap-1 text-xs mt-1"><TrendingUp size={12}/> +12 this week</div>
              </div>
              <div className="kpi-3d gradient-success rounded-xl p-4 text-white">
                <div className="text-[11px] uppercase opacity-90">Closed</div>
                <div className="text-4xl font-bold mt-1">226</div>
                <div className="flex items-center gap-1 text-xs mt-1"><TrendingUp size={12}/> +24 this week</div>
              </div>
            </div>
            <div className="mt-4 h-[120px]">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="40%" outerRadius="100%" data={[
                  { name:"Closed", value: 70, fill:"var(--chart-3)"},
                  { name:"Open",   value: 30, fill:"var(--chart-1)"},
                ]} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={8} background={{ fill:"var(--secondary)"}}/>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-xs text-muted-foreground -mt-2">Closure rate <span className="font-bold text-foreground">69.8%</span></div>
          </div>
        </div>

        {/* Section 4: Consultants */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-7 card-3d rounded-2xl p-5">
            <SectionTitle icon={Award} title="Top Consultants" subtitle="Performance ranking"
              right={<button className="text-xs text-primary font-medium hover:underline">View all →</button>}/>
            <div className="space-y-3">
              {topConsultants.map((c, i) => {
                const max = Math.max(...topConsultants.map(x=>x.added));
                return (
                  <div key={c.name} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/60 transition">
                    <div className="w-6 text-center text-xs font-bold text-muted-foreground">#{i+1}</div>
                    <div className={`w-10 h-10 rounded-xl ${c.grad} flex items-center justify-center text-white font-bold text-sm shadow-pop`}>{c.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.clients} clients · {c.mandates} mandates</div>
                      </div>
                      <div className="mt-1.5 grid grid-cols-2 gap-2">
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                            <span>Candidates Added</span><span className="font-semibold text-foreground">{c.added}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div className={`h-full ${c.grad} shimmer`} style={{width:`${(c.added/max)*100}%`}}/>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                            <span>Placed</span><span className="font-semibold text-foreground">{c.placed}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div className="h-full gradient-success" style={{width:`${(c.placed/62)*100}%`}}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-12 xl:col-span-5 card-3d rounded-2xl p-5">
            <SectionTitle icon={Activity} title="Consultant Comparison" subtitle="Added · Placed · Mandates"/>
            <div className="h-[300px]">
              <ResponsiveContainer>
                <BarChart data={consultantCompare}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="name" tick={{fontSize:11, fill:"var(--muted-foreground)"}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:10, fill:"var(--muted-foreground)"}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{borderRadius:12, border:"1px solid var(--border)"}}/>
                  <Bar dataKey="Added"    fill="var(--chart-1)" radius={[6,6,0,0]}/>
                  <Bar dataKey="Placed"   fill="var(--chart-3)" radius={[6,6,0,0]}/>
                  <Bar dataKey="Mandates" fill="var(--chart-4)" radius={[6,6,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Section 5: Company Performance */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-4 card-3d rounded-2xl p-5">
            <SectionTitle icon={Target} title="Client Conversion Funnel" subtitle="Lead → Billing"/>
            <div className="space-y-2.5 mt-2">
              {funnelClients.map((f, i) => {
                const w = 100 - i * 14;
                return (
                  <div key={f.name} className="flex items-center gap-3">
                    <div className="w-24 text-[11px] text-muted-foreground text-right">{f.name}</div>
                    <div className="flex-1 h-10 rounded-xl flex items-center px-3 text-white font-semibold shadow-pop relative overflow-hidden"
                         style={{
                           width: `${w}%`,
                           background: `linear-gradient(135deg, ${f.color}, color-mix(in oklab, ${f.color} 60%, white))`,
                         }}>
                      <span className="relative z-10 text-sm">{f.value}</span>
                      <ArrowUpRight size={14} className="ml-auto relative z-10 opacity-80"/>
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-12 xl:col-span-5 card-3d rounded-2xl p-5">
            <SectionTitle icon={Activity} title="Placement Metrics" subtitle="End-to-end pipeline"/>
            <div className="grid grid-cols-5 gap-3">
              {placementMetrics.map(p => (
                <div key={p.label} className={`kpi-3d ${p.grad} rounded-xl p-3 text-white text-center`}>
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center mx-auto animate-float">
                    <p.icon size={16}/>
                  </div>
                  <div className="text-xl font-bold mt-2">{p.value.toLocaleString()}</div>
                  <div className="text-[10px] uppercase tracking-wider opacity-90 mt-0.5">{p.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-secondary/60 border border-border grid grid-cols-3 gap-3 text-center text-xs">
              <div><div className="text-muted-foreground">Sub→Int</div><div className="font-bold text-base text-foreground">59.8%</div></div>
              <div><div className="text-muted-foreground">Int→Offer</div><div className="font-bold text-base text-foreground">37.0%</div></div>
              <div><div className="text-muted-foreground">Offer→Hire</div><div className="font-bold text-base text-success">61.3%</div></div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-3 card-3d rounded-2xl p-5">
            <SectionTitle icon={DollarSign} title="Estimated Revenue" subtitle="Quarter to date"/>
            <div className="kpi-3d gradient-primary rounded-xl p-4 text-white">
              <div className="text-[11px] uppercase opacity-90">Total Estimated</div>
              <div className="text-3xl font-bold mt-1">₹4.82 Cr</div>
              <div className="flex items-center gap-1 text-xs mt-1"><TrendingUp size={12}/> +18.4% QoQ</div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="p-3 rounded-xl bg-secondary/60 border border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">FCS Revenue</span>
                  <span className="font-bold">₹2.94 Cr</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-background overflow-hidden">
                  <div className="h-full gradient-info" style={{width:"61%"}}/>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-secondary/60 border border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">FCAPL Revenue</span>
                  <span className="font-bold">₹1.88 Cr</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-background overflow-hidden">
                  <div className="h-full gradient-pink" style={{width:"39%"}}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Activity + Quick actions */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-8 card-3d rounded-2xl p-5">
            <SectionTitle icon={Clock} title="Recent Activity" subtitle="Live updates across the team"
              right={<button className="text-xs text-primary font-medium hover:underline">View all →</button>}/>
            <div className="relative pl-4">
              <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border"/>
              <div className="space-y-3">
                {activities.map((a, i) => (
                  <div key={i} className="relative flex items-start gap-3">
                    <div className={`absolute -left-[14px] top-1 w-3.5 h-3.5 rounded-full ${a.color} shadow-pop ring-4 ring-background`}/>
                    <div className={`w-9 h-9 rounded-xl ${a.color} text-white flex items-center justify-center shrink-0 shadow-pop`}>
                      <a.icon size={16}/>
                    </div>
                    <div className="flex-1 min-w-0 p-2.5 rounded-xl bg-secondary/50 border border-border">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">{a.text}</div>
                        <div className="text-[11px] text-muted-foreground whitespace-nowrap ml-2">{a.t}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4 card-3d rounded-2xl p-5">
            <SectionTitle icon={Sparkles} title="Quick Actions" subtitle="Get things done faster"/>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label:"Add Client",    icon: Building2, grad:"gradient-primary" },
                { label:"Add Candidate", icon: UserPlus,  grad:"gradient-info" },
                { label:"Add Mandate",   icon: Briefcase, grad:"gradient-warning" },
                { label:"Export Report", icon: Download,  grad:"gradient-success" },
              ].map(b => (
                <button key={b.label} className={`kpi-3d ${b.grad} rounded-xl p-4 text-white text-left group`}>
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <b.icon size={18}/>
                  </div>
                  <div className="text-sm font-semibold">{b.label}</div>
                  <div className="flex items-center gap-1 text-[11px] opacity-90 mt-0.5">
                    Open <ArrowUpRight size={11}/>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl border border-dashed border-border text-xs text-muted-foreground text-center">
              Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-foreground">N</kbd> anywhere to create new.
            </div>
          </div>
        </div>

        <footer className="text-center text-[11px] text-muted-foreground py-4">
          © 2026 Fyndbridge ATS · Executive Dashboard · All figures shown are sample data
        </footer>
      </main>
    </div>
  );
}