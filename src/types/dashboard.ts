
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
