import React, { useState, useEffect } from "react";
import type { Student } from "../../../types";
import DeleteIcon from "../../../assets/DeleteIcon.svg";
import EditIcon from "../../../assets/EditIcon.svg";
import { Button, Buttons, Div, FormDiv, IconButton, Img, Input, Label, SecondaryButton, StudentLabel, List, TableContainer, Item } from "../styled";

type Props = {
  numberOfQuestions: number;
  numberOfRows: number; // <-- nowy props
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
  const [studentId, setStudentId] = useState("");
  const [studentAnswers, setStudentAnswers] = useState("");
  const [studentRow, setStudentRow] = useState(1); // domyślnie rząd 1
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
      alert(`Uczeń powinien mieć ${numberOfQuestions} odpowiedzi.`);
      return;
    }

    if (!studentId.trim()) {
      alert("ID ucznia nie może być puste.");
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
        alert("Uczeń o takim ID już istnieje!");
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
      alert("Nie dodano żadnych uczniów.");
      return;
    }
    onSubmitAll(students);
  };

  return (
    <FormDiv>
      <Div>
        <h3>{editingIndex !== null ? "Edytuj ucznia" : "Dodaj ucznia"}</h3>
        <StudentLabel>
          <label htmlFor="rows">
            ID ucznia:
          </label>
          <Input
            id="rows"
            long={true}
            placeholder="np. imię lub indeks"
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </StudentLabel>
        <StudentLabel>
          <label htmlFor="rows">
            Odpowiedzi:
          </label>
          <Input
            id="rows"
            long={true}
            placeholder="np. a,b,c"
            type="text"
            value={studentAnswers}
            onChange={(e) => setStudentAnswers(e.target.value)}
          />
        </StudentLabel>
        <Label>
          <label>
            Rząd:{" "}
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
          {editingIndex !== null ? "Zapisz zmiany" : "Dodaj ucznia"}
        </SecondaryButton>
        {editingIndex !== null && (
          <SecondaryButton
            type="button"
            onClick={() => setEditingIndex(null)}
          >
            Anuluj edycję
          </SecondaryButton>
        )}
        </Buttons>
      </Div>
      <Div>
        <h3>Dodani uczniowie ({students.length}):</h3>
        <TableContainer>
          <List visible={students.length === 0 ? false : true}>
            <Item>
              <span>ID ucznia</span>
              <span>Rząd</span>
              <span>Odpowiedzi</span>
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
        Zatwierdź wszystkich
      </Button>
    </FormDiv>
  );
};
