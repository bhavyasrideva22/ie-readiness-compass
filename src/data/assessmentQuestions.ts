import { AssessmentQuestion } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Psychometric Section - Interest Scale
  {
    id: 'psych_001',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I often wonder how processes can be improved and made more efficient.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.2
  },
  {
    id: 'psych_002',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I enjoy analyzing systems to find bottlenecks and inefficiencies.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.3
  },
  {
    id: 'psych_003',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I find it satisfying to optimize workflows and eliminate waste.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.2
  },
  
  // Psychometric Section - Personality Fit
  {
    id: 'psych_004',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I prefer structured environments over completely open-ended ones.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.0
  },
  {
    id: 'psych_005',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I enjoy working with both people and technical systems.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.1
  },
  
  // Psychometric Section - Cognitive Style
  {
    id: 'psych_006',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'cognitive',
    question: 'I enjoy finding logical flaws in arguments and processes.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.2
  },
  {
    id: 'psych_007',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'cognitive',
    question: 'I prefer data-driven decision making over intuition-based choices.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.3
  },
  
  // Psychometric Section - Motivation
  {
    id: 'psych_008',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'I want to learn Industrial Engineering to solve real-world problems.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.4
  },
  {
    id: 'psych_009',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'I am motivated by the challenge of optimizing complex systems.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.3
  },

  // Technical & Aptitude Section - Logical Reasoning
  {
    id: 'apt_001',
    type: 'multiple-choice',
    category: 'aptitude',
    subcategory: 'logical',
    question: 'In a sequence: 2, 6, 18, 54, ?, what is the next number?',
    options: ['108', '162', '216', '324'],
    correctAnswer: '162',
    weight: 1.0
  },
  {
    id: 'apt_002',
    type: 'multiple-choice',
    category: 'aptitude',
    subcategory: 'logical',
    question: 'If all engineers are problem-solvers, and some problem-solvers are creative, which conclusion is valid?',
    options: [
      'All engineers are creative',
      'Some engineers might be creative',
      'No engineers are creative',
      'All creative people are engineers'
    ],
    correctAnswer: 'Some engineers might be creative',
    weight: 1.2
  },

  // Technical & Aptitude Section - Numerical Ability
  {
    id: 'apt_003',
    type: 'multiple-choice',
    category: 'aptitude',
    subcategory: 'numerical',
    question: 'A factory produces 240 units per day with 8 workers. What is the productivity per worker per hour (8-hour workday)?',
    options: ['3 units/hour', '3.75 units/hour', '4 units/hour', '5 units/hour'],
    correctAnswer: '3.75 units/hour',
    weight: 1.1
  },
  {
    id: 'apt_004',
    type: 'multiple-choice',
    category: 'aptitude',
    subcategory: 'numerical',
    question: 'If defect rate decreases by 20% each month, and starts at 100 defects, how many defects after 2 months?',
    options: ['60', '64', '80', '76'],
    correctAnswer: '64',
    weight: 1.1
  },

  // Technical & Aptitude Section - Problem Solving
  {
    id: 'apt_005',
    type: 'scenario',
    category: 'aptitude',
    subcategory: 'problem-solving',
    scenario: 'A manufacturing line has three stations: A (2 min/unit), B (3 min/unit), C (1.5 min/unit).',
    question: 'What is the bottleneck and maximum throughput per hour?',
    options: [
      'Station A, 30 units/hour',
      'Station B, 20 units/hour', 
      'Station C, 40 units/hour',
      'No bottleneck, 60 units/hour'
    ],
    correctAnswer: 'Station B, 20 units/hour',
    weight: 1.4
  },

  // Pre-requisite Knowledge Quiz
  {
    id: 'know_001',
    type: 'multiple-choice',
    category: 'knowledge',
    subcategory: 'basics',
    question: 'What does "Just-in-Time" manufacturing primarily aim to reduce?',
    options: ['Labor costs', 'Inventory waste', 'Machine downtime', 'Quality defects'],
    correctAnswer: 'Inventory waste',
    weight: 0.8
  },
  {
    id: 'know_002',
    type: 'multiple-choice',
    category: 'knowledge',
    subcategory: 'basics',
    question: 'Which tool is commonly used for process improvement in Industrial Engineering?',
    options: ['SWOT Analysis', 'Six Sigma', 'Porter\'s Five Forces', 'PESTEL Analysis'],
    correctAnswer: 'Six Sigma',
    weight: 0.8
  },

  // WISCAR Framework - Will
  {
    id: 'wiscar_001',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I persist in learning topics that initially seem hard or complex.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.0
  },
  {
    id: 'wiscar_002',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I maintain focus on long-term goals even when facing setbacks.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.1
  },

  // WISCAR Framework - Interest
  {
    id: 'wiscar_003',
    type: 'slider',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'How interested are you in optimizing systems and processes?',
    scale: {
      min: 0,
      max: 100,
      labels: ['Not at all interested', 'Extremely interested']
    },
    weight: 1.3
  },
  {
    id: 'wiscar_004',
    type: 'slider',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'How interested are you in working with data and analytics?',
    scale: {
      min: 0,
      max: 100,
      labels: ['Not at all interested', 'Extremely interested']
    },
    weight: 1.2
  },

  // WISCAR Framework - Skill
  {
    id: 'wiscar_005',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'I can use basic mathematical and statistical tools confidently.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.1
  },
  {
    id: 'wiscar_006',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'I am comfortable with spreadsheet software and data analysis.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.0
  },

  // WISCAR Framework - Cognitive Readiness
  {
    id: 'wiscar_007',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'Which pattern comes next: Triangle, Square, Pentagon, ?',
    options: ['Hexagon', 'Circle', 'Rectangle', 'Octagon'],
    correctAnswer: 'Hexagon',
    weight: 1.0
  },

  // WISCAR Framework - Ability to Learn
  {
    id: 'wiscar_008',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'learning',
    question: 'Mistakes and failures are key opportunities for learning and growth.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.2
  },
  {
    id: 'wiscar_009',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'learning',
    question: 'I actively seek feedback to improve my understanding and skills.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    },
    weight: 1.1
  },

  // WISCAR Framework - Real-World Alignment
  {
    id: 'wiscar_010',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'alignment',
    scenario: 'You are asked to redesign a warehouse layout to improve efficiency and reduce worker fatigue.',
    question: 'How appealing does this project sound to you?',
    options: [
      'Very appealing - I would love this challenge',
      'Somewhat appealing - Interesting but not exciting',
      'Neutral - Just another task to complete',
      'Not very appealing - Seems tedious',
      'Not appealing at all - Would prefer different work'
    ],
    weight: 1.4
  },
  {
    id: 'wiscar_011',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'alignment',
    scenario: 'A company wants to reduce production costs by 15% while maintaining quality standards.',
    question: 'How confident are you in tackling this type of challenge?',
    options: [
      'Very confident - This is exactly what I want to do',
      'Confident - I could learn and succeed at this',
      'Somewhat confident - With training, I could handle it',
      'Not very confident - This seems quite difficult',
      'Not confident at all - This is not for me'
    ],
    weight: 1.3
  }
];

export const getSectionQuestions = (section: string): AssessmentQuestion[] => {
  switch (section) {
    case 'psychometric':
      return assessmentQuestions.filter(q => q.category === 'psychometric');
    case 'aptitude':
      return assessmentQuestions.filter(q => q.category === 'aptitude' || q.category === 'knowledge');
    case 'wiscar':
      return assessmentQuestions.filter(q => q.category === 'wiscar');
    default:
      return [];
  }
};

export const getQuestionsBySubcategory = (category: string, subcategory: string): AssessmentQuestion[] => {
  return assessmentQuestions.filter(q => q.category === category && q.subcategory === subcategory);
};