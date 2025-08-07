import { AssessmentResults } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  Brain, 
  Target,
  BookOpen,
  Users,
  Download,
  RotateCcw
} from "lucide-react";

interface AssessmentResultsProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export const AssessmentResultsPage = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'Yes': return <CheckCircle className="w-6 h-6 text-success" />;
      case 'Maybe': return <AlertCircle className="w-6 h-6 text-warning" />;
      default: return <XCircle className="w-6 h-6 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'Yes': return 'bg-success text-white';
      case 'Maybe': return 'bg-warning text-white';
      default: return 'bg-destructive text-white';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-success';
    if (score >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getFitLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-success text-white';
      case 'Medium': return 'bg-warning text-white';
      default: return 'bg-destructive text-white';
    }
  };

  return (
    <div className="min-h-screen bg-assessment-bg py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              {getRecommendationIcon()}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Your Assessment Results
            </h1>
            
            <Badge className={`text-lg px-6 py-2 ${getRecommendationColor()}`}>
              {results.recommendation === 'Yes' ? 'Industrial Engineering is a Great Fit!' :
               results.recommendation === 'Maybe' ? 'Industrial Engineering Might Be For You' :
               'Consider Alternative Paths'}
            </Badge>
          </div>

          {/* Overall Score */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Overall Confidence Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className={`text-6xl font-bold ${getScoreColor(results.overallConfidenceScore)}`}>
                  {results.overallConfidenceScore}%
                </div>
                <Progress value={results.overallConfidenceScore} className="h-3" />
                <p className="text-muted-foreground">
                  {results.overallConfidenceScore >= 70 ? 'Strong alignment with Industrial Engineering' :
                   results.overallConfidenceScore >= 40 ? 'Moderate potential for success in IE' :
                   'Limited alignment with Industrial Engineering'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Scores Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Psychometric Score */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Psychometric Fit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Personality & Interest Alignment</span>
                    <span className={`text-2xl font-bold ${getScoreColor(results.psychometricFitScore)}`}>
                      {results.psychometricFitScore}%
                    </span>
                  </div>
                  <Progress value={results.psychometricFitScore} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Technical Score */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Technical Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Aptitude & Knowledge</span>
                    <span className={`text-2xl font-bold ${getScoreColor(results.technicalReadinessScore)}`}>
                      {results.technicalReadinessScore}%
                    </span>
                  </div>
                  <Progress value={results.technicalReadinessScore} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* WISCAR Framework */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-success" />
                WISCAR Framework Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(results.wiscarScores).map(([key, score]) => (
                  <div key={key} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                        {score}%
                      </span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Matches */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-info" />
                Top Career Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.careerMatches.map((career, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{career.role}</h3>
                        <p className="text-sm text-muted-foreground">{career.description}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={getFitLevelColor(career.fitLevel)}>
                          {career.fitLevel} Fit
                        </Badge>
                        <div className="text-lg font-bold text-primary">
                          {career.fitScore}%
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Skills Needed:</p>
                      <div className="flex flex-wrap gap-2">
                        {career.skillsNeeded.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gradient-subtle rounded-lg">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border-l-4 border-primary bg-gradient-card rounded-r-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p className="text-sm text-muted-foreground">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={onRestart} className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Take Assessment Again
            </Button>
            
            <Button variant="assessment" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Results PDF
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>These results are based on validated psychometric instruments and your responses.</p>
            <p>Consider consulting with academic advisors for additional guidance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};