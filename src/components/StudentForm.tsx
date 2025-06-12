import React, { useState } from "react";
import type { Student } from "../types";

type Props = {
  numberOfQuestions: number;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  onSubmitAll: (students: Student[]) => void;
};

export const StudentForm: React.FC<Props> = ({
  numberOfQuestions,
  onSubmitAll,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState("");
  const [studentAnswers, setStudentAnswers] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // ← nowość

  const handleAddOrUpdateStudent = () => {
    const answers = studentAnswers.trim().split(",");

    if (answers.length !== numberOfQuestions) {
      alert(`Uczeń powinien mieć ${numberOfQuestions} odpowiedzi.`);
      return;
    }

    if (!studentId.trim()) {
      alert("ID ucznia nie może być puste.");
      return;
    }

    const newStudent: Student = { id: studentId.trim(), answers };

    if (editingIndex !== null) {
      const updated = [...students];
      updated[editingIndex] = newStudent;
      setStudents(updated);
      setEditingIndex(null);
    } else {
      setStudents([...students, newStudent]);
    }

    setStudentId("");
    setStudentAnswers("");
  };

  const handleEdit = (index: number) => {
    const s = students[index];
    setStudentId(s.id);
    setStudentAnswers(s.answers.join(","));
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
    // Jeśli edytowany został usunięty – zresetuj edycję
    if (editingIndex === index) {
      setStudentId("");
      setStudentAnswers("");
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
        Odpowiedzi (np. A,B,C,...):
        <input
          type="text"
          value={studentAnswers}
          onChange={(e) => setStudentAnswers(e.target.value)}
        />
      </label>
      <br />

      <button type="button" onClick={handleAddOrUpdateStudent}>
        {editingIndex !== null ? "Zapisz zmiany" : "Dodaj ucznia"}
      </button>

      {editingIndex !== null && (
        <button
          type="button"
          onClick={() => {
            setEditingIndex(null);
            setStudentId("");
            setStudentAnswers("");
          }}
          style={{ marginLeft: "1rem" }}
        >
          Anuluj edycję
        </button>
      )}

      <h4>Dodani uczniowie ({students.length}):</h4>
      <ul>
        {students.map((s, i) => (
          <li key={s.id}>
            <strong>{s.id}</strong>: {s.answers.join(", ")}{" "}
            <button onClick={() => handleEdit(i)}>Edytuj</button>{" "}
            <button onClick={() => handleDelete(i)}>Usuń</button>
          </li>
        ))}
      </ul>

      <button onClick={handleSubmitAll}>Zatwierdź wszystkich</button>
    </div>
  );
};

