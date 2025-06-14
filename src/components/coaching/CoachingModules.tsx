
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Play } from "lucide-react";
import type { CoachingModule } from "@/types/coaching";

interface CoachingModulesProps {
  modules: CoachingModule[];
}

export const CoachingModules = ({ modules }: CoachingModulesProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5" />
          <span>Módulos de Entrenamiento</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module) => (
            <div key={module.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium">{module.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                </div>
                {module.completed && <Award className="w-5 h-5 text-green-600" />}
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className={getDifficultyColor(module.difficulty)}>
                  {module.difficulty === "beginner" && "Principiante"}
                  {module.difficulty === "intermediate" && "Intermedio"}
                  {module.difficulty === "advanced" && "Avanzado"}
                </Badge>
                <span className="text-xs text-gray-500">{module.estimatedTime}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Progreso</span>
                  <span className="text-sm font-medium">{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>
              
              <Button 
                className="w-full" 
                variant={module.completed ? "outline" : "default"}
                size="sm"
              >
                <Play className="w-4 h-4 mr-2" />
                {module.completed ? "Revisar" : module.progress > 0 ? "Continuar" : "Comenzar"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
