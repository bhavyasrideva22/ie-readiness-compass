import { useState, useEffect } from "react";
import { AssessmentHero } from "./AssessmentHero";
import { AssessmentIntro } from "./AssessmentIntro";
import { AssessmentProgress } from "./AssessmentProgress";
import { AssessmentQuestion } from "./AssessmentQuestion";
import { AssessmentResultsPage } from "./AssessmentResults";
import { AssessmentState, AssessmentResponse } from "@/types/assessment";
import { getSectionQuestions } from "@/data/assessmentQuestions";
import { calculateAssessmentResults } from "@/utils/assessmentLogic";

type FlowStep = 'hero' | 'intro' | 'assessment' | 'results';
type AssessmentSection = 'psychometric' | 'aptitude' | 'wiscar';

export const AssessmentFlow = () => {
  const [currentFlow, setCurrentFlow] = useState<FlowStep>('hero');
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentStep: 0,
    currentSection: 'intro',
    responses: [],
    startTime: new Date(),
    sectionStartTime: new Date()
  });

  const [currentSection, setCurrentSection] = useState<AssessmentSection>('psychometric');
  const [sectionQuestions, setSectionQuestions] = useState(getSectionQuestions('psychometric'));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessmentResults, setAssessmentResults] = useState(null);

  // Load questions for current section
  useEffect(() => {
    const questions = getSectionQuestions(currentSection);
    setSectionQuestions(questions);
    setCurrentQuestionIndex(0);
  }, [currentSection]);

  const handleStartAssessment = () => {
    setCurrentFlow('intro');
  };

  const handleBeginAssessment = () => {
    setCurrentFlow('assessment');
    setAssessmentState(prev => ({
      ...prev,
      startTime: new Date(),
      sectionStartTime: new Date(),
      currentSection: 'psychometric'
    }));
  };

  const handleQuestionAnswer = (answer: string | number) => {
    const currentQuestion = sectionQuestions[currentQuestionIndex];
    if (!currentQuestion) return;

    setAssessmentState(prev => {
      const newResponses = prev.responses.filter(r => r.questionId !== currentQuestion.id);
      newResponses.push({
        questionId: currentQuestion.id,
        answer,
        timeSpent: Date.now() - prev.sectionStartTime.getTime()
      });

      return {
        ...prev,
        responses: newResponses
      };
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAssessmentState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        sectionStartTime: new Date()
      }));
    } else {
      // Move to next section or complete assessment
      moveToNextSection();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAssessmentState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1,
        sectionStartTime: new Date()
      }));
    } else {
      // Move to previous section if available
      moveToPreviousSection();
    }
  };

  const moveToNextSection = () => {
    const sectionOrder: AssessmentSection[] = ['psychometric', 'aptitude', 'wiscar'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    
    if (currentIndex < sectionOrder.length - 1) {
      const nextSection = sectionOrder[currentIndex + 1];
      setCurrentSection(nextSection);
      setAssessmentState(prev => ({
        ...prev,
        currentSection: nextSection,
        sectionStartTime: new Date()
      }));
    } else {
      // Complete assessment and show results
      completeAssessment();
    }
  };

  const moveToPreviousSection = () => {
    const sectionOrder: AssessmentSection[] = ['psychometric', 'aptitude', 'wiscar'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    
    if (currentIndex > 0) {
      const prevSection = sectionOrder[currentIndex - 1];
      setCurrentSection(prevSection);
      const prevQuestions = getSectionQuestions(prevSection);
      setCurrentQuestionIndex(prevQuestions.length - 1);
      
      setAssessmentState(prev => ({
        ...prev,
        currentSection: prevSection,
        sectionStartTime: new Date()
      }));
    }
  };

  const completeAssessment = () => {
    const results = calculateAssessmentResults(assessmentState.responses);
    setAssessmentResults(results);
    setCurrentFlow('results');
  };

  const handleRestart = () => {
    setCurrentFlow('hero');
    setCurrentSection('psychometric');
    setCurrentQuestionIndex(0);
    setAssessmentState({
      currentStep: 0,
      currentSection: 'intro',
      responses: [],
      startTime: new Date(),
      sectionStartTime: new Date()
    });
    setAssessmentResults(null);
  };

  const getCurrentAnswer = () => {
    const currentQuestion = sectionQuestions[currentQuestionIndex];
    if (!currentQuestion) return undefined;
    
    const response = assessmentState.responses.find(r => r.questionId === currentQuestion.id);
    return response?.answer;
  };

  const getTotalSteps = () => {
    return getSectionQuestions('psychometric').length + 
           getSectionQuestions('aptitude').length + 
           getSectionQuestions('wiscar').length;
  };

  const getCurrentStepNumber = () => {
    const psychometricLength = getSectionQuestions('psychometric').length;
    const aptitudeLength = getSectionQuestions('aptitude').length;
    
    switch (currentSection) {
      case 'psychometric':
        return currentQuestionIndex + 1;
      case 'aptitude':
        return psychometricLength + currentQuestionIndex + 1;
      case 'wiscar':
        return psychometricLength + aptitudeLength + currentQuestionIndex + 1;
      default:
        return 1;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      psychometric: 'Psychometric Assessment',
      aptitude: 'Technical & Aptitude',
      wiscar: 'WISCAR Framework'
    };
    return titles[currentSection] || 'Assessment';
  };

  const getQuestionTitle = () => {
    const currentQuestion = sectionQuestions[currentQuestionIndex];
    if (!currentQuestion) return 'Loading...';
    
    const subcategoryTitles = {
      interest: 'Interest & Motivation',
      personality: 'Personality Fit',
      cognitive: 'Cognitive Style',
      motivation: 'Learning Motivation',
      logical: 'Logical Reasoning',
      numerical: 'Numerical Ability',
      'problem-solving': 'Problem Solving',
      basics: 'Knowledge Check',
      will: 'Persistence & Grit',
      skill: 'Current Skills',
      learning: 'Learning Ability',
      alignment: 'Real-World Alignment'
    };
    
    return subcategoryTitles[currentQuestion.subcategory] || 'Assessment Question';
  };

  // Render current flow step
  switch (currentFlow) {
    case 'hero':
      return <AssessmentHero onStartAssessment={handleStartAssessment} />;
      
    case 'intro':
      return (
        <AssessmentIntro 
          onNext={handleBeginAssessment}
          onBack={() => setCurrentFlow('hero')}
        />
      );
      
    case 'assessment':
      const currentQuestion = sectionQuestions[currentQuestionIndex];
      if (!currentQuestion) {
        return <div>Loading...</div>;
      }
      
      return (
        <>
          <AssessmentProgress
            currentStep={getCurrentStepNumber()}
            totalSteps={getTotalSteps()}
            currentSection={getSectionTitle()}
            stepTitle={getQuestionTitle()}
          />
          <AssessmentQuestion
            question={currentQuestion}
            onAnswer={handleQuestionAnswer}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            canGoNext={true}
            canGoPrevious={getCurrentStepNumber() > 1}
            currentAnswer={getCurrentAnswer()}
          />
        </>
      );
      
    case 'results':
      return assessmentResults ? (
        <AssessmentResultsPage
          results={assessmentResults}
          onRestart={handleRestart}
        />
      ) : (
        <div>Loading results...</div>
      );
      
    default:
      return <AssessmentHero onStartAssessment={handleStartAssessment} />;
  }
};