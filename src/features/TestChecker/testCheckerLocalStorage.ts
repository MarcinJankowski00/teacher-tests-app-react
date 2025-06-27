
import type { StudentsState, TestConfig } from "../../types";

export const saveStudentsLocalStorage = (students: StudentsState) =>
    localStorage.setItem("students", JSON.stringify(students));

export const getStudentsFromLocalStorage = (): StudentsState => {
  try {
    const data = localStorage.getItem("students");
    return data ? JSON.parse(data) : { list: [] };
  } catch {
    return { list: [] };
  }
};

export const saveConfigLocalStorage = (config: TestConfig) =>
    localStorage.setItem("config", JSON.stringify(config));

export const getConfigFromLocalStorage = (): TestConfig => {
  const data = localStorage.getItem("config");
  return data
    ? JSON.parse(data)
    : {
        numberOfQuestions: 0,
        numberOfRows: 1,
        answerKey: [],
        gradeScale: [
          { grade: "1", threshold: 0 },
          { grade: "2", threshold: 30 },
          { grade: "3", threshold: 50 },
          { grade: "4", threshold: 75 },
          { grade: "5", threshold: 85 },
          { grade: "6", threshold: 95 },
        ],
      };
};