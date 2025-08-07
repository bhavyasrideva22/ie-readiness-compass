import { AssessmentResponse, AssessmentResults, WiscarScores, CareerMatch } from '@/types/assessment';
import { assessmentQuestions } from '@/data/assessmentQuestions';

export const calculateAssessmentResults = (responses: AssessmentResponse[]): AssessmentResults => {
  // Create response map for easy lookup
  const responseMap = new Map(responses.map(r => [r.questionId, r.answer]));

  // Calculate Psychometric Fit Score
  const psychometricFitScore = calculatePsychometricScore(responseMap);
  
  // Calculate Technical Readiness Score
  const technicalReadinessScore = calculateTechnicalScore(responseMap);
  
  // Calculate WISCAR Scores
  const wiscarScores = calculateWiscarScores(responseMap);
  
  // Calculate Overall Confidence Score
  const overallConfidenceScore = calculateOverallScore(
    psychometricFitScore, 
    technicalReadinessScore, 
    wiscarScores
  );

  // Generate recommendation
  const recommendation = generateRecommendation(overallConfidenceScore);
  
  // Generate career matches
  const careerMatches = generateCareerMatches(wiscarScores, technicalReadinessScore);
  
  // Generate next steps
  const nextSteps = generateNextSteps(recommendation, wiscarScores, technicalReadinessScore);
  
  // Generate insights
  const insights = generateInsights(psychometricFitScore, technicalReadinessScore, wiscarScores);

  return {
    psychometricFitScore: Math.round(psychometricFitScore),
    technicalReadinessScore: Math.round(technicalReadinessScore),
    wiscarScores: {
      will: Math.round(wiscarScores.will),
      interest: Math.round(wiscarScores.interest),
      skill: Math.round(wiscarScores.skill),
      cognitive: Math.round(wiscarScores.cognitive),
      abilityToLearn: Math.round(wiscarScores.abilityToLearn),
      realWorldAlignment: Math.round(wiscarScores.realWorldAlignment)
    },
    overallConfidenceScore: Math.round(overallConfidenceScore),
    recommendation,
    careerMatches,
    nextSteps,
    insights
  };
};

const calculatePsychometricScore = (responseMap: Map<string, string | number>): number => {
  const psychQuestions = assessmentQuestions.filter(q => q.category === 'psychometric');
  let totalScore = 0;
  let totalWeight = 0;

  psychQuestions.forEach(question => {
    const response = responseMap.get(question.id);
    if (response !== undefined) {
      const normalizedScore = normalizeResponse(response, question);
      const weight = question.weight || 1;
      totalScore += normalizedScore * weight;
      totalWeight += weight;
    }
  });

  return totalWeight > 0 ? (totalScore / totalWeight) * 20 : 0; // Scale to 0-100
};

const calculateTechnicalScore = (responseMap: Map<string, string | number>): number => {
  const techQuestions = assessmentQuestions.filter(q => 
    q.category === 'aptitude' || q.category === 'knowledge'
  );
  let correctAnswers = 0;
  let totalQuestions = 0;

  techQuestions.forEach(question => {
    const response = responseMap.get(question.id);
    if (response !== undefined) {
      totalQuestions++;
      if (question.correctAnswer && response === question.correctAnswer) {
        correctAnswers++;
      }
    }
  });

  return totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
};

const calculateWiscarScores = (responseMap: Map<string, string | number>): WiscarScores => {
  const categories = ['will', 'interest', 'skill', 'cognitive', 'learning', 'alignment'];
  const scores: any = {};

  categories.forEach(category => {
    const questions = assessmentQuestions.filter(q => 
      q.category === 'wiscar' && q.subcategory === category
    );
    
    let totalScore = 0;
    let totalWeight = 0;

    questions.forEach(question => {
      const response = responseMap.get(question.id);
      if (response !== undefined) {
        const normalizedScore = normalizeResponse(response, question);
        const weight = question.weight || 1;
        totalScore += normalizedScore * weight;
        totalWeight += weight;
      }
    });

    scores[category] = totalWeight > 0 ? (totalScore / totalWeight) * 20 : 0;
  });

  return {
    will: scores.will || 0,
    interest: scores.interest || 0,
    skill: scores.skill || 0,
    cognitive: scores.cognitive || 0,
    abilityToLearn: scores.learning || 0,
    realWorldAlignment: scores.alignment || 0
  };
};

const normalizeResponse = (response: string | number, question: any): number => {
  if (question.type === 'likert') {
    return Number(response);
  } else if (question.type === 'slider') {
    const max = question.scale?.max || 100;
    return (Number(response) / max) * 5; // Normalize to 1-5 scale
  } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
    if (question.correctAnswer) {
      return response === question.correctAnswer ? 5 : 1;
    } else {
      // For scenario questions without correct answers, map option index to score
      const options = question.options || [];
      const index = options.indexOf(response as string);
      return index >= 0 ? (options.length - index) : 1;
    }
  }
  return 1;
};

const calculateOverallScore = (
  psychometric: number, 
  technical: number, 
  wiscar: WiscarScores
): number => {
  const wiscarAverage = Object.values(wiscar).reduce((sum, score) => sum + score, 0) / 6;
  
  // Weighted combination
  return (psychometric * 0.3) + (technical * 0.3) + (wiscarAverage * 0.4);
};

const generateRecommendation = (overallScore: number): 'Yes' | 'Maybe' | 'Not Recommended' => {
  if (overallScore >= 70) return 'Yes';
  if (overallScore >= 40) return 'Maybe';
  return 'Not Recommended';
};

const generateCareerMatches = (wiscar: WiscarScores, technical: number): CareerMatch[] => {
  const roles: CareerMatch[] = [
    {
      role: 'Process Engineer',
      description: 'Designs and improves manufacturing workflows',
      skillsNeeded: ['Process optimization', 'Data analysis', 'Systems thinking'],
      fitScore: Math.round((wiscar.skill + wiscar.realWorldAlignment + technical) / 3),
      fitLevel: 'Medium'
    },
    {
      role: 'Supply Chain Analyst',
      description: 'Manages flow of goods and data through supply networks',
      skillsNeeded: ['Forecasting', 'Excel/Analytics', 'Optimization'],
      fitScore: Math.round((wiscar.interest + wiscar.cognitive + technical) / 3),
      fitLevel: 'High'
    },
    {
      role: 'Quality Engineer',
      description: 'Ensures standards and reduces waste in production',
      skillsNeeded: ['Quality control tools', 'Six Sigma', 'Statistical analysis'],
      fitScore: Math.round((wiscar.skill + technical + wiscar.will) / 3),
      fitLevel: 'Low'
    },
    {
      role: 'Operations Manager',
      description: 'Oversees day-to-day operations and process improvements',
      skillsNeeded: ['Leadership', 'Process management', 'Problem-solving'],
      fitScore: Math.round((wiscar.realWorldAlignment + wiscar.abilityToLearn + wiscar.will) / 3),
      fitLevel: 'Medium'
    }
  ];

  // Adjust fit levels based on scores
  roles.forEach(role => {
    if (role.fitScore >= 75) role.fitLevel = 'High';
    else if (role.fitScore >= 50) role.fitLevel = 'Medium';
    else role.fitLevel = 'Low';
  });

  return roles.sort((a, b) => b.fitScore - a.fitScore);
};

const generateNextSteps = (
  recommendation: string, 
  wiscar: WiscarScores, 
  technical: number
): string[] => {
  const steps: string[] = [];

  if (recommendation === 'Yes') {
    steps.push('Enroll in an Introduction to Industrial Engineering course');
    steps.push('Start learning Lean Manufacturing principles');
    if (technical < 70) {
      steps.push('Strengthen your mathematical and statistical foundations');
    }
    steps.push('Explore internship opportunities in manufacturing or operations');
  } else if (recommendation === 'Maybe') {
    if (wiscar.skill < 60) {
      steps.push('Complete a foundations course in mathematics and statistics');
    }
    if (wiscar.interest < 60) {
      steps.push('Job shadow an Industrial Engineer to understand the field better');
    }
    steps.push('Take an online course in Operations Management');
    steps.push('Reassess your interests after gaining more exposure to the field');
  } else {
    steps.push('Consider alternative fields like Business Analysis or Project Management');
    steps.push('Explore your strongest areas identified in this assessment');
    if (wiscar.cognitive > 70) {
      steps.push('Consider Data Analytics or Systems Analysis roles');
    }
    if (wiscar.realWorldAlignment > 60) {
      steps.push('Look into Logistics or Supply Chain roles');
    }
  }

  return steps;
};

const generateInsights = (
  psychometric: number, 
  technical: number, 
  wiscar: WiscarScores
): string[] => {
  const insights: string[] = [];

  // Psychometric insights
  if (psychometric >= 75) {
    insights.push('Your personality and interests align strongly with Industrial Engineering');
  } else if (psychometric >= 50) {
    insights.push('You show moderate personality fit for Industrial Engineering');
  } else {
    insights.push('Your personality profile suggests you might prefer other engineering disciplines');
  }

  // Technical insights
  if (technical >= 80) {
    insights.push('Your technical aptitude is excellent for engineering work');
  } else if (technical >= 60) {
    insights.push('Your technical skills are adequate but could benefit from strengthening');
  } else {
    insights.push('Focus on building fundamental technical and analytical skills');
  }

  // WISCAR insights
  const wiscarValues = Object.values(wiscar);
  const maxWiscar = Math.max(...wiscarValues);
  const minWiscar = Math.min(...wiscarValues);

  if (wiscar.interest > 80) {
    insights.push('Your high interest level is a strong predictor of success in IE');
  }
  
  if (wiscar.will > 80) {
    insights.push('Your persistence and grit will serve you well in challenging coursework');
  }
  
  if (wiscar.abilityToLearn > 80) {
    insights.push('Your growth mindset and learning ability are key strengths');
  }

  if (minWiscar < 40) {
    if (wiscar.skill < 40) {
      insights.push('Consider building technical skills before pursuing IE programs');
    }
    if (wiscar.cognitive < 40) {
      insights.push('Work on logical reasoning and problem-solving skills');
    }
  }

  return insights;
};