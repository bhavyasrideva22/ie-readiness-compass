import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-assessment.jpg";

interface AssessmentHeroProps {
  onStartAssessment: () => void;
}

export const AssessmentHero = ({ onStartAssessment }: AssessmentHeroProps) => {
  return (
    <div className="relative min-h-screen bg-gradient-subtle">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                🧠 AI-Powered Career Assessment
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Is Industrial Engineering 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Right for You?</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Discover your fit for Industrial Engineering through comprehensive psychometric, 
                aptitude, and career alignment analysis powered by AI.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-card">
                <Clock className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold text-sm">25-30 Minutes</p>
                  <p className="text-xs text-muted-foreground">Complete assessment</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-card">
                <Users className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-semibold text-sm">WISCAR Framework</p>
                  <p className="text-xs text-muted-foreground">6-dimensional analysis</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-card">
                <TrendingUp className="w-6 h-6 text-success" />
                <div>
                  <p className="font-semibold text-sm">Career Matching</p>
                  <p className="text-xs text-muted-foreground">Personalized recommendations</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-card">
                <CheckCircle className="w-6 h-6 text-info" />
                <div>
                  <p className="font-semibold text-sm">Validated Tests</p>
                  <p className="text-xs text-muted-foreground">Big 5, Grit, RIASEC</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={onStartAssessment}
                className="animate-pulse-glow"
              >
                Start Your Assessment
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Free • No registration required • Instant results
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="Industrial Engineering Assessment Platform"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-elegant animate-bounce">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">95%</p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-card p-6 rounded-xl shadow-elegant animate-bounce" style={{ animationDelay: '0.5s' }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">10K+</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};