import React, { useState, useEffect } from "react";
import type { Student } from "../../types";

type Props = {
  numberOfQuestions: number;
  students: Student[]; // teraz z propsów, nie lokalnego stanu
  setStudents: (students: Student[]) => void; // funkcja do aktualizacji globalnego stanu
  onSubmitAll: (students: Student[]) => void;
};

export const StudentForm: React.FC<Props> = ({
  numberOfQuestions,
  students,
  setStudents,
  onSubmitAll,
}) => {
  const [studentId, setStudentId] = useState("");
  const [studentAnswers, setStudentAnswers] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Gdy zmieni się edytowany uczeń (indeks), ładujemy dane do formularza
  useEffect(() => {
    if (editingIndex !== null && students[editingIndex]) {
      const s = students[editingIndex];
      setStudentId(s.id);
      setStudentAnswers(s.answers.join(","));
    } else {
      // czyścimy formularz
      setStudentId("");
      setStudentAnswers("");
    }
  }, [editingIndex, students]);

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
      // Sprawdź, czy ID nie istnieje już (opcjonalnie)
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
          onClick={() => setEditingIndex(null)}
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

