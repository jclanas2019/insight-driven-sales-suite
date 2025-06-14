
export interface SalesMetric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface PipelineStage {
  stage: string;
  deals: number;
  value: string;
  progress: number;
}

export interface RecentActivity {
  type: "call" | "email" | "meeting";
  contact: string;
  company: string;
  time: string;
  status: string;
}

export interface SalesTrendData {
  mes: string;
  ventas: number;
  oportunidades: number;
  leads: number;
  meta: number;
}

export interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  closeDate: string;
  owner: string;
  // Nuevos campos para scoring
  interactions: {
    calls: number;
    emails: number;
    meetings: number;
  };
  lastActivity: string; // fecha de última actividad
  companySize: "small" | "medium" | "large";
  industry: string;
  leadActivity: "low" | "medium" | "high";
}

export interface DealScore {
  total: number;
  level: "cold" | "warm" | "hot";
  breakdown: {
    interactions: number;
    recency: number;
    company: number;
    activity: number;
  };
}
