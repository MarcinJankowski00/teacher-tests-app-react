import React, { useState, useEffect } from "react";
import type { Student } from "../../types";

type Props = {
  numberOfQuestions: number;
  numberOfRows: number; // <-- nowy props
  students: Student[];
  setStudents: (students: Student[]) => void;
  onSubmitAll: (students: Student[]) => void;
  onBackToConfig: () => void;
};

export const StudentForm: React.FC<Props> = ({
  numberOfQuestions,
  numberOfRows,
  students,
  setStudents,
  onBackToConfig,
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
    <div>
      <h3>{editingIndex !== null ? "Edytuj ucznia" : "Dodaj ucznia"}</h3>

      <label>
        ID ucznia:
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </label>
      <br />

      <label>
        Odpowiedzi (np. a,b,c,...):
        <input
          type="text"
          value={studentAnswers}
          onChange={(e) => setStudentAnswers(e.target.value)}
        />
      </label>
      <br />

      <label>
        Rząd:
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
      <br />

      <button type="button" onClick={handleAddOrUpdateStudent}>
        {editingIndex !== null ? "Zapisz zmiany" : "Dodaj ucznia"}
      </button>

      {editingIndex !== null && (
        <button
          type="button"
          onClick={() => setEditingIndex(null)}
          style={{ marginLeft: "1rem" }}
        >
          Anuluj edycję
        </button>
      )}

      <h4>Dodani uczniowie ({students.length}):</h4>
      <table>
        <tr>
          <th>ID ucznia</th>
          <th>Rząd</th>
          <th>Odpowiedzi</th>
          <th></th>
          <th></th>
        </tr>
        {students.map((s, i) => (
            <tr key={s.id}>
              <td><strong>{s.id}</strong></td>
              <td>{s.row}</td>
              <td>{s.answers.join(", ")}</td>
              <td><button onClick={() => handleEdit(i)}>Edytuj</button></td>
              <td><button onClick={() => handleDelete(i)}>Usuń</button></td>
            </tr>
        ))}
      </table>

      <button onClick={handleSubmitAll}>Zatwierdź wszystkich</button>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={onBackToConfig} style={{ marginLeft: "1rem" }}>
          ← Zmień konfigurację testu
        </button>
      </div>
    </div>
  );
};
