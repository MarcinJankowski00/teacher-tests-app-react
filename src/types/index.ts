
export type TestConfig = {
  numberOfQuestions: number;
  numberOfRows: number; // <-- nowy
  answerKey: string[][]; // <-- jeden klucz odpowiedzi na rząd
  gradeScale: GradeThreshold[];
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