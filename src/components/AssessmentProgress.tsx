import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
  currentSection: string;
  stepTitle: string;
}

export const AssessmentProgress = ({ 
  currentStep, 
  totalSteps, 
  currentSection, 
  stepTitle 
}: AssessmentProgressProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <Badge variant="outline" className="text-xs">
              {currentSection}
            </Badge>
            <h2 className="text-lg font-semibold text-foreground">
              {stepTitle}
            </h2>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
            <p className="text-xs text-muted-foreground">
              {Math.round(progressPercentage)}% Complete
            </p>
          </div>
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="h-2"
        />
      </div>
    </div>
  );
};