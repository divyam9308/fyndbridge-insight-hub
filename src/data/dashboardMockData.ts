export const consultants = [
  "Overall (All Consultants)",
  "Divyam Aggarwal",
  "Rajneesh Sharma",
  "Ria Ghoshal",
  "Aarohi Sharma",
  "Neha Kapoor",
];

export const periods = [
  "This Month",
  "Q1",
  "Q2",
  "Q3",
  "Q4",
  "This Year (YTD)",
  "Till This Date",
];

export const sparkA = [4, 8, 6, 10, 9, 14, 12, 18, 16, 22, 20, 26].map((v, i) => ({ i, v }));
export const sparkB = [20, 18, 22, 19, 24, 21, 26, 23, 28, 25, 30, 28].map((v, i) => ({ i, v }));
export const sparkC = [2, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11, 14].map((v, i) => ({ i, v }));
export const sparkD = [10, 12, 11, 14, 13, 16, 15, 18, 17, 20, 19, 22].map((v, i) => ({ i, v }));
export const sparkE = [3, 5, 4, 7, 6, 10, 8, 11, 10, 13, 12, 15].map((v, i) => ({ i, v }));

export const kpis = [
  { label: "Total Clients", value: "326", delta: "+12.4%", up: true, gradient: "gradient-primary", data: sparkA },
  { label: "Total Candidates", value: "842", delta: "+18.2%", up: true, gradient: "gradient-info", data: sparkB },
  { label: "Total Mandates", value: "164", delta: "+6.8%", up: true, gradient: "gradient-warning", data: sparkC },
];

export const clientStatus = [
  { name: "Active", value: 142, color: "var(--chart-1)" },
  { name: "Inactive", value: 58, color: "var(--chart-7)" },
  { name: "Converted", value: 68, color: "var(--chart-3)" },
  { name: "Not Converted", value: 34, color: "var(--chart-5)" },
  { name: "Follow Up Required", value: 12, color: "var(--chart-4)" },
  { name: "Not Hiring", value: 6, color: "var(--chart-2)" },
  { name: "Not Adding Consultants", value: 4, color: "var(--chart-6)" },
  { name: "Didn't Pick Up", value: 2, color: "var(--chart-8)" },
];

export const candidateStatus = [
  { name: "Interested", value: 220, color: "var(--chart-1)" },
  { name: "Not Interested", value: 96, color: "var(--chart-7)" },
  { name: "Rejected by Recruiter", value: 84, color: "var(--chart-5)" },
  { name: "Client Submission", value: 128, color: "var(--chart-2)" },
  { name: "Interview", value: 74, color: "var(--chart-3)" },
  { name: "Rejected by Client", value: 52, color: "var(--chart-6)" },
  { name: "Offered", value: 28, color: "var(--chart-4)" },
  { name: "Offer Declined", value: 10, color: "var(--chart-8)" },
  { name: "Dropout", value: 8, color: "var(--chart-6)" },
  { name: "Hired", value: 37, color: "var(--chart-3)" },
];

export const mandateStatus = [
  { name: "Ongoing", value: 103, color: "var(--chart-1)" },
  { name: "Completed", value: 37, color: "var(--chart-3)" },
  { name: "Scrapped", value: 24, color: "var(--chart-5)" },
];

export const clientTrend = [
  { m: "Jan", active: 104, converted: 49 },
  { m: "Feb", active: 109, converted: 52 },
  { m: "Mar", active: 114, converted: 55 },
  { m: "Apr", active: 118, converted: 58 },
  { m: "May", active: 125, converted: 61 },
  { m: "Jun", active: 142, converted: 68 },
];

export const candidateTrend = [
  { m: "Jan", movement: 48, hired: 4 },
  { m: "Feb", movement: 56, hired: 5 },
  { m: "Mar", movement: 63, hired: 6 },
  { m: "Apr", movement: 71, hired: 7 },
  { m: "May", movement: 76, hired: 7 },
  { m: "Jun", movement: 84, hired: 8 },
];

export const mandateTrend = [
  { m: "Jan", ongoing: 72, completed: 21, scrapped: 13 },
  { m: "Feb", ongoing: 76, completed: 25, scrapped: 14 },
  { m: "Mar", ongoing: 81, completed: 28, scrapped: 15 },
  { m: "Apr", ongoing: 88, completed: 32, scrapped: 17 },
  { m: "May", ongoing: 96, completed: 35, scrapped: 19 },
  { m: "Jun", ongoing: 103, completed: 37, scrapped: 24 },
];

export const candidateFunnel = [
  { name: "Interested", value: 220, color: "var(--chart-1)" },
  { name: "Client Submission", value: 128, color: "var(--chart-2)" },
  { name: "Interview", value: 74, color: "var(--chart-3)" },
  { name: "Offered", value: 28, color: "var(--chart-4)" },
  { name: "Hired", value: 37, color: "var(--chart-8)" },
];

export const consultantPerformance = [
  { name: "Divyam Aggarwal", added: 168, hired: 14, mandates: 32, clients: 24, avatar: "DA", grad: "gradient-primary" },
  { name: "Rajneesh Sharma", added: 142, hired: 11, mandates: 28, clients: 19, avatar: "RS", grad: "gradient-info" },
  { name: "Ria Ghoshal", added: 126, hired: 8, mandates: 21, clients: 16, avatar: "RG", grad: "gradient-pink" },
  { name: "Aarohi Sharma", added: 104, hired: 7, mandates: 18, clients: 13, avatar: "AS", grad: "gradient-teal" },
  { name: "Neha Kapoor", added: 88, hired: 5, mandates: 15, clients: 10, avatar: "NK", grad: "gradient-warning" },
];

export const consultantCompare = consultantPerformance.map((c) => ({
  name: c.name.split(" ")[0],
  "Candidates Added": c.added,
  "Candidates Hired": c.hired,
  "Mandates Managed": c.mandates,
  "Active Clients": c.clients,
}));

export const navItems = [
  "Dashboard",
  "Clients",
  "Candidates",
  "Mandates",
  "Consultants",
  "Reports",
  "Billing Entities",
  "Settings",
];

export const billingEntities = [
  { label: "FCS Billing Entity", value: 86, split: "61%", gradient: "gradient-info" },
  { label: "FCAPL Billing Entity", value: 56, split: "39%", gradient: "gradient-pink" },
];

export const recentActivities = [
  "New client added: BluePeak Consulting",
  "Candidate moved to Interview for Product Manager",
  "Contract signed with Silverline Analytics",
  "Mandate completed: Senior Backend Engineer",
  "Candidate hired for Fintech Consultant role",
  "Follow up required with Acme Corp",
];
