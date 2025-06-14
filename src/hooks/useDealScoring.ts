
import { Deal, DealScore } from "@/types/dashboard";

export const useDealScoring = () => {
  const calculateScore = (deal: Deal): DealScore => {
    // Puntuación por interacciones (0-25 puntos)
    const interactionScore = Math.min(
      (deal.interactions.calls * 3 + 
       deal.interactions.emails * 1 + 
       deal.interactions.meetings * 5), 
      25
    );

    // Puntuación por recencia (0-25 puntos)
    const daysSinceLastActivity = Math.floor(
      (new Date().getTime() - new Date(deal.lastActivity).getTime()) / (1000 * 60 * 60 * 24)
    );
    const recencyScore = Math.max(25 - daysSinceLastActivity, 0);

    // Puntuación por tamaño de empresa (0-25 puntos)
    const companySizeScore = {
      "small": 8,
      "medium": 15,
      "large": 25
    }[deal.companySize];

    // Puntuación por actividad del lead (0-25 puntos)
    const activityScore = {
      "low": 5,
      "medium": 15,
      "high": 25
    }[deal.leadActivity];

    const totalScore = interactionScore + recencyScore + companySizeScore + activityScore;

    // Determinar nivel de madurez
    let level: "cold" | "warm" | "hot";
    if (totalScore >= 70) {
      level = "hot";
    } else if (totalScore >= 40) {
      level = "warm";
    } else {
      level = "cold";
    }

    return {
      total: totalScore,
      level,
      breakdown: {
        interactions: interactionScore,
        recency: recencyScore,
        company: companySizeScore,
        activity: activityScore
      }
    };
  };

  const getScoreColor = (level: "cold" | "warm" | "hot") => {
    switch (level) {
      case "hot": return "bg-red-100 text-red-800 border-red-200";
      case "warm": return "bg-orange-100 text-orange-800 border-orange-200";
      case "cold": return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getScoreLabel = (level: "cold" | "warm" | "hot") => {
    switch (level) {
      case "hot": return "🔥 Caliente";
      case "warm": return "🌡️ Tibio";
      case "cold": return "❄️ Frío";
    }
  };

  return {
    calculateScore,
    getScoreColor,
    getScoreLabel
  };
};
