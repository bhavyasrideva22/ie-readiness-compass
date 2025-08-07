export interface AssessmentQuestion {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario' | 'slider';
  category: 'psychometric' | 'aptitude' | 'wiscar' | 'knowledge';
  subcategory: string;
  question: string;
  options?: string[];
  scale?: {
    min: number;
    max: number;
    labels: string[];
  };
  scenario?: string;
  correctAnswer?: string | number;
  weight?: number;
}

export interface AssessmentResponse {
  questionId: string;
  answer: string | number;
  timeSpent?: number;
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  abilityToLearn: number;
  realWorldAlignment: number;
}

export interface AssessmentResults {
  psychometricFitScore: number;
  technicalReadinessScore: number;
  wiscarScores: WiscarScores;
  overallConfidenceScore: number;
  recommendation: 'Yes' | 'Maybe' | 'Not Recommended';
  nextSteps: string[];
  careerMatches: CareerMatch[];
  insights: string[];
}

export interface CareerMatch {
  role: string;
  description: string;
  skillsNeeded: string[];
  fitScore: number;
  fitLevel: 'High' | 'Medium' | 'Low';
}

export interface AssessmentState {
  currentStep: number;
  currentSection: 'intro' | 'psychometric' | 'aptitude' | 'wiscar' | 'results';
  responses: AssessmentResponse[];
  startTime: Date;
  sectionStartTime: Date;
}