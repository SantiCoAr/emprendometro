import { BriefcaseBusiness, Rocket, Cpu, Target, Workflow, TrendingUp, Users } from "lucide-react";

function pickIcon(role: string) {
  const r = role.toLowerCase();
  if (r.includes("cto") || r.includes("tech") || r.includes("product")) return Cpu;
  if (r.includes("ceo") || r.includes("general")) return BriefcaseBusiness;
  if (r.includes("growth") || r.includes("ventas") || r.includes("comercial")) return TrendingUp;
  if (r.includes("ops") || r.includes("operac")) return Workflow;
  if (r.includes("marketing")) return Target;
  if (r.includes("founder")) return Rocket;
  return Users;
}

export default function PersonaChip({ role }: { role: string }) {
  const Icon = pickIcon(role);
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
      <Icon size={16} />
      <span className="text-sm font-medium">{role}</span>
    </span>
  );
}
