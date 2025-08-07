import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { AssessmentQuestion as Question } from "@/types/assessment";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

interface AssessmentQuestionProps {
  question: Question;
  onAnswer: (answer: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  currentAnswer?: string | number;
}

export const AssessmentQuestion = ({
  question,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  currentAnswer
}: AssessmentQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>(currentAnswer || '');

  const handleAnswerChange = (answer: string | number) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'likert':
        return (
          <div className="space-y-4">
            <RadioGroup 
              value={selectedAnswer.toString()} 
              onValueChange={(value) => handleAnswerChange(parseInt(value))}
              className="space-y-3"
            >
              {question.scale?.labels.map((label, index) => {
                const value = question.scale!.min + index;
                return (
                  <div key={value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={value.toString()} id={`option-${value}`} />
                    <Label 
                      htmlFor={`option-${value}`} 
                      className="flex-1 cursor-pointer text-sm font-medium"
                    >
                      {label}
                    </Label>
                    <Badge variant="outline" className="text-xs">
                      {value}
                    </Badge>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <RadioGroup 
              value={selectedAnswer.toString()} 
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-6">
            <div className="px-4">
              <Slider
                value={[Number(selectedAnswer) || question.scale?.min || 0]}
                onValueChange={([value]) => handleAnswerChange(value)}
                max={question.scale?.max || 100}
                min={question.scale?.min || 0}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>{question.scale?.labels[0]}</span>
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">
                  {selectedAnswer || question.scale?.min || 0}
                </div>
              </div>
              <span>{question.scale?.labels[1]}</span>
            </div>
          </div>
        );

      case 'scenario':
        return (
          <div className="space-y-6">
            {question.scenario && (
              <div className="p-4 bg-gradient-subtle rounded-lg border-l-4 border-primary">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm mb-2">Scenario:</p>
                    <p className="text-sm text-muted-foreground">{question.scenario}</p>
                  </div>
                </div>
              </div>
            )}
            
            <RadioGroup 
              value={selectedAnswer.toString()} 
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option} id={`scenario-${index}`} className="mt-1" />
                  <Label 
                    htmlFor={`scenario-${index}`} 
                    className="flex-1 cursor-pointer text-sm leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  const getCategoryColor = () => {
    switch (question.category) {
      case 'psychometric': return 'bg-blue-500';
      case 'aptitude': return 'bg-green-500';
      case 'wiscar': return 'bg-purple-500';
      case 'knowledge': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-assessment-bg py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="shadow-elegant animate-fade-in">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="capitalize">
                <div className={`w-2 h-2 rounded-full mr-2 ${getCategoryColor()}`} />
                {question.category} - {question.subcategory}
              </Badge>
              
              {question.weight && question.weight > 1 && (
                <Badge variant="secondary">
                  High Impact
                </Badge>
              )}
            </div>
            
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderQuestionInput()}
            
            <div className="flex justify-between items-center pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={onPrevious}
                disabled={!canGoPrevious}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button 
                variant="assessment" 
                onClick={onNext}
                disabled={!canGoNext || !selectedAnswer}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};