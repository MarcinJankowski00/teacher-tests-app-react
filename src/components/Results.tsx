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

  const calculateGrade = (points: number) => {
    const result = (points*100)/config.numberOfQuestions;
    console.log(result)
    for(var i= 0; i < config.gradeScale.length; i++)
    {
      if((result) >= config.gradeScale[i].threshold){
        return config.gradeScale[i].grade;
      }
    }
  };

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
      <table>
        <tr>
          <th>ID ucznia</th>
          <th>Rząd</th>
          <th>Odpowiedzi</th>
          <th>Klucz</th>
          <th>Wynik</th>
          <th>Ocena</th>
        </tr>
        {students.map((student) => {
          const score = student.answers.reduce((acc, answer, index) => {
            const rowIndex = student.row - 1;
            const correctAnswer = config.answerKey[rowIndex]?.[index];
            return answer === correctAnswer ? acc + 1 : acc;
          }, 0);

          return (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.row}</td>
              <td>{student.answers}</td>
              <td>{config.answerKey[student.row-1]}</td>
              <td>{score} / {config.numberOfQuestions}</td>
              <td>{calculateGrade(score)}</td>
            </tr>
          );
        })}
      </table>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={onBackToStudents}>← Wróć do uczniów</button>
        <button onClick={onBackToConfig} style={{ marginLeft: "1rem" }}>
          ← Zmień konfigurację testu
        </button>
      </div>
    </div>
  );
};