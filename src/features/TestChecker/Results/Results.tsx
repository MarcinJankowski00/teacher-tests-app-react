import React from "react";
import type { Student, TestConfig } from "../../../types";
import { Cell, Table, TableContainer } from "../styled";
import { exportToPDF } from "./ExportToPDF";
import { exportToExcel } from "./ExportToXLSX";
import { useTranslation } from "react-i18next";

type Props = {
  students: Student[];
  config: TestConfig;
};

export const Results: React.FC<Props> = ({
  students,
  config,
}) => {
  const { t } = useTranslation();
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
    const result = (points * 100) / config.numberOfQuestions;
    for (var i = 0; i < config.gradeScale.length; i++) {
      if ((result) >= config.gradeScale[i].threshold) {
        return config.gradeScale[i].grade;
      }
    }
  };

  const handleExporToPDF = () => {
    const headers = [
      t("studentID"),
      t("row"),
      t("points"),
      t("grade"),
    ];
    exportToPDF(generateResults(), headers);
  };

  const handleExporToExcel = () => {
    exportToExcel(generateResults(), {
      id: t("studentID"),
      row: t("row"),
      score: t("points"),
      grade: t("grade"),
    });
  };

  return (
    <>
      <TableContainer>
        <Table result="true" visible="true">
          <thead>
            <tr>
              <th>{t("studentID")}</th>
              <th>{t("row")}</th>
              <th>{t("answers")}</th>
              <th>{t("key")}</th>
              <th>{t("result")}</th>
              <th>{t("grade")}</th>
            </tr>
          </thead>
          <tbody>
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
                <Cell>{config.answerKey[student.row - 1]}</Cell>
                <Cell>{score} / {config.numberOfQuestions}</Cell>
                <Cell>{calculateGrade(score)}</Cell>
              </tr>
            );
          })}
          </tbody>
        </Table>
      </TableContainer>
      <button onClick={handleExporToPDF}>{t("exportPDF")}</button>
      <button onClick={handleExporToExcel}>{t("exportXLSX")}</button>
    </>
  );
};