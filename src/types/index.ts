export type TestConfig = {
    numberOfQuestions: number;
    answerKey: string[]; // np. ['A', 'C', 'B', ...]
  };
  
  export type Student = {
    id: string;
    answers: string[];
    score?: number;
    grade?: string;
  };
  
  export type GradeThreshold = {
    minPercentage: number; // np. 90
    grade: string;         // np. '5'
  };