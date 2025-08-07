import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  TrendingUp, 
  Users, 
  BarChart3,
  CheckCircle,
  Clock,
  Brain,
  Target
} from "lucide-react";

interface AssessmentIntroProps {
  onNext: () => void;
  onBack: () => void;
}

export const AssessmentIntro = ({ onNext, onBack }: AssessmentIntroProps) => {
  const careers = [
    { title: "Process Improvement Analyst", icon: TrendingUp },
    { title: "Manufacturing Engineer", icon: Settings },
    { title: "Supply Chain Analyst", icon: BarChart3 },
    { title: "Operations Manager", icon: Users },
    { title: "Systems Engineer", icon: Brain },
    { title: "Quality Control Specialist", icon: CheckCircle }
  ];

  const skills = [
    "Strong analytical thinking",
    "Systems-level problem-solving", 
    "Process orientation",
    "Attention to detail",
    "Communication and collaboration",
    "Comfort with data and optimization tools",
    "Curiosity for how systems work"
  ];

  return (
    <div className="min-h-screen bg-assessment-bg py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Assessment Introduction
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Understanding Industrial Engineering
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn what Industrial Engineering involves and whether it aligns with your interests and career goals.
            </p>
          </div>

          {/* Purpose Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Purpose of This Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                This assessment helps students, early-career professionals, and career switchers evaluate 
                whether Industrial Engineering (IE) is the right path for them. It evaluates your interests, 
                personality fit, cognitive readiness, current skill level, and potential career alignment 
                through validated psychometric instruments and aptitude tests.
              </p>
            </CardContent>
          </Card>

          {/* What is IE Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                What is Industrial Engineering?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Industrial Engineering focuses on optimizing complex processes, systems, or organizations. 
                It combines engineering principles with business strategies to improve quality, efficiency, 
                and productivity across various industries.
              </p>
              
              <div className="bg-gradient-subtle p-4 rounded-lg">
                <p className="font-medium text-foreground mb-2">Key Focus Areas:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Process optimization and workflow design</li>
                  <li>• Quality management and control systems</li>
                  <li>• Supply chain and logistics management</li>
                  <li>• Data analysis and performance metrics</li>
                  <li>• Human factors and ergonomics</li>
                  <li>• Operations research and systems thinking</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Careers Grid */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-success" />
                Typical Careers in Industrial Engineering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {careers.map((career, index) => {
                  const IconComponent = career.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gradient-card rounded-lg border hover:shadow-card transition-all duration-300 hover:scale-105"
                    >
                      <IconComponent className="w-5 h-5 text-primary" />
                      <span className="font-medium text-sm">{career.title}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-info" />
                Skills & Traits for Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              Back to Home
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Ready to discover your fit?
              </p>
              <Button variant="assessment" size="lg" onClick={onNext}>
                Begin Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};