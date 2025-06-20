import React from "react";
import type { Student, TestConfig } from "../types";

type Props = {
  students: Student[];
  config: TestConfig;
  onBackToStudents: () => void;
  onBackToConfig: () => void;
};

export const Results: React.FC<Props> = ({
  students,
  config,
  onBackToStudents,
  onBackToConfig,
}) => {
  return (
    <div>
      <h2>Raport wyników</h2>
      <p>Klucz odpowiedzi: {config.answerKey.join(", ")}</p>

      <ul>
        {students.map((student) => {
          const score = student.answers.reduce((acc, answer, index) => {
            const rowIndex = student.row - 1;
            const correctAnswer = config.answerKey[rowIndex]?.[index];
            return answer === correctAnswer ? acc + 1 : acc;
          }, 0);

          return (
            <li key={student.id}>
              {student.id} (rząd {student.row}.): {score} / {config.numberOfQuestions}
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={onBackToStudents}>← Wróć do uczniów</button>
        <button onClick={onBackToConfig} style={{ marginLeft: "1rem" }}>
          ← Zmień konfigurację testu
        </button>
      </div>
    </div>
  );
};