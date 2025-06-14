
export interface CoachingModule {
  id: number;
  title: string;
  description: string;
  progress: number;
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
}

export interface PerformanceMetric {
  label: string;
  current: number;
  target: number;
  improvement: number;
}

export interface CoachingSession {
  id: number;
  title: string;
  date: string;
  duration: string;
  coach: string;
  status: "completed" | "scheduled" | "cancelled";
  score?: number;
}
