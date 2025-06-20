export type TestConfig = {
  numberOfQuestions: number;
  numberOfRows: number; // <-- nowy
  answerKey: string[][]; // <-- jeden klucz odpowiedzi na rząd
};
  
  export type Student = {
    id: string;
    answers: string[];
    row: number;
    score?: number;
    grade?: string;
  };
  
  export type GradeThreshold = {
    minPercentage: number; // np. 90
    grade: string;         // np. '5'
  };