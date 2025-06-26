import React from "react";
import type { Student, TestConfig } from "../../../types";
import { Cell, Table, TableContainer } from "../styled";
import { exportToPDF } from "./ExportToPDF";

type Props = {
  students: Student[];
  config: TestConfig;
};

export const Results: React.FC<Props> = ({
  students,
  config,
}) => {

    const generateResults = () => {
    return students.map((student) => {
      const score = student.answers.reduce((acc, answer, index) => {
        const correct = config.answerKey[student.row - 1]?.[index];
        return answer === correct ? acc + 1 : acc;
      }, 0);

      return {
        name: student.id,
        row: student.row,
        score: `${score} / ${config.numberOfQuestions}`,
        grade: calculateGrade(score),
      };
    });
  };

  const calculateGrade = (points: number) => {
    const result = (points*100)/config.numberOfQuestions;
    for(var i= 0; i < config.gradeScale.length; i++)
    {
      if((result) >= config.gradeScale[i].threshold){
        return config.gradeScale[i].grade;
      }
    }
  };

  return (
    <>
    <TableContainer>
      <Table result={true} visible={true}>
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
              <Cell>{student.id}</Cell>
              <Cell>{student.row}</Cell>
              <Cell>{student.answers}</Cell>
              <Cell>{config.answerKey[student.row-1]}</Cell>
              <Cell>{score} / {config.numberOfQuestions}</Cell>
              <Cell>{calculateGrade(score)}</Cell>
            </tr>
          );
        })}
      </Table>
    </TableContainer>
    <button onClick={() => exportToPDF(generateResults())}>Eksportuj do PDF</button>
    </>
  );
};