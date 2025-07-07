
export type TestConfig = {
  numberOfQuestions: number;
  numberOfRows: number;
  answerKey: string[][];
  gradeScale: GradeThreshold[];
};

export type StudentsState = {
  list: Student[];
};
  
export type Student = {
  id: string;
  answers: string[];
  row: number;
  score?: number;
  grade?: string;
};
  
export type GradeThreshold = {
  grade: string;
  threshold: number; 
};