import React, { useState, useEffect } from "react";
import type { Student } from "../../../types";
import DeleteIcon from "../../../assets/DeleteIcon.svg";
import EditIcon from "../../../assets/EditIcon.svg";
import { Button, Buttons, Div, FormDiv, IconButton, Img, Input, Label, SecondaryButton, StudentLabel, List, TableContainer, Item } from "../styled";
import { useTranslation } from "react-i18next";

type Props = {
  numberOfQuestions: number;
  numberOfRows: number;
  students: Student[];
  setStudents: (students: Student[]) => void;
  onSubmitAll: (students: Student[]) => void;
};

export const StudentForm: React.FC<Props> = ({
  numberOfQuestions,
  numberOfRows,
  students,
  setStudents,
  onSubmitAll,
}) => {
  const { t } = useTranslation();
  const [studentId, setStudentId] = useState("");
  const [studentAnswers, setStudentAnswers] = useState("");
  const [studentRow, setStudentRow] = useState(1);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (editingIndex !== null && students[editingIndex]) {
      const s = students[editingIndex];
      setStudentId(s.id);
      setStudentAnswers(s.answers.join(","));
      setStudentRow(s.row);
    } else {
      setStudentId("");
      setStudentAnswers("");
    }
  }, [editingIndex, students]);

  const handleAddOrUpdateStudent = () => {
    const answers = studentAnswers.trim().split(",").map((a) => a.trim());

    if (answers.length !== numberOfQuestions) {
      alert(`${t("studentsAlert1")} ${numberOfQuestions} ${t("studentsAlertAnswers")}`);
      return;
    }

    if (!studentId.trim()) {
      alert(t("studentsAlert2"));
      return;
    }

    const newStudent: Student = {
      id: studentId.trim(),
      answers,
      row: studentRow,
    };

    if (editingIndex !== null) {
      const updated = [...students];
      updated[editingIndex] = newStudent;
      setStudents(updated);
      setEditingIndex(null);
    } else {
      if (students.some((s) => s.id === newStudent.id)) {
        alert(t("studentsAlert3"));
        return;
      }
      setStudents([...students, newStudent]);
    }

    setStudentId("");
    setStudentAnswers("");
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleSubmitAll = () => {
    if (students.length === 0) {
      alert(t("studentsAlert4"));
      return;
    }
    onSubmitAll(students);
  };

  return (
    <FormDiv>
      <Div>
        <h3>{editingIndex !== null ? t("editStudent") : t("addStudent")}</h3>
        <StudentLabel>
          <label htmlFor="rows">
            {t("studentID")}
          </label>
          <Input
            id="rows"
            long={true}
            placeholder={t("studentIDPlaceholder")}
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </StudentLabel>
        <StudentLabel>
          <label htmlFor="rows">
            {t("answers")}
          </label>
          <Input
            id="rows"
            long={true}
            placeholder={t("answersPlaceholder")}
            type="text"
            value={studentAnswers}
            onChange={(e) => setStudentAnswers(e.target.value)}
          />
        </StudentLabel>
        <Label>
          <label>
            {t("row")}:{" "}
            <select
              value={studentRow}
              onChange={(e) => setStudentRow(Number(e.target.value))}
            >
              {Array.from({ length: numberOfRows }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
        </Label>
        <Buttons>
        <SecondaryButton type="button" onClick={handleAddOrUpdateStudent}>
          {editingIndex !== null ? t("saveChanges") : t("addStudent")}
        </SecondaryButton>
        {editingIndex !== null && (
          <SecondaryButton
            type="button"
            onClick={() => setEditingIndex(null)}
          >
            {t("cancel")}
          </SecondaryButton>
        )}
        </Buttons>
      </Div>
      <Div>
        <h3>{t("addedStudents")} ({students.length}):</h3>
        <TableContainer>
          <List visible={students.length === 0 ? false : true}>
            <Item>
              <span>{t("studentID")}</span>
              <span>{t("row")}</span>
              <span>{t("answers")}</span>
              <span></span>
              <span></span>
            </Item>
            {students.map((s, i) => (
              <Item key={s.id}>
                <span><strong>{s.id}</strong></span>
                <span>{s.row}</span>
                <span>{s.answers.join(", ")}</span>
                <IconButton onClick={() => handleEdit(i)}><Img src={EditIcon} alt="Edit"/></IconButton>
                <IconButton onClick={() => handleDelete(i)}><Img src={DeleteIcon} alt="Delete"/></IconButton>
              </Item>
            ))}
          </List>
        </TableContainer>
      </Div>
      <Button onClick={handleSubmitAll}>
        {t("confirmAll")}
      </Button>
    </FormDiv>
  );
};
