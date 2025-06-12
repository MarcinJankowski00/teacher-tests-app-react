import React, { useState } from "react";
import type { Student } from "../types";

type Props = {
  numberOfQuestions: number;
  onSubmitAll: (students: Student[]) => void;
};

export const StudentForm: React.FC<Props> = ({ numberOfQuestions, onSubmitAll }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState("");
  const [studentAnswers, setStudentAnswers] = useState("");

  const handleAddStudent = () => {
    const answers = studentAnswers.trim().split(",");

    if (answers.length !== numberOfQuestions) {
      alert(`Uczeń powinien mieć ${numberOfQuestions} odpowiedzi.`);
      return;
    }

    if (!studentId.trim()) {
      alert("ID ucznia nie może być puste.");
      return;
    }

    setStudents([...students, { id: studentId.trim(), answers }]);
    setStudentId("");
    setStudentAnswers("");
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
      <h3>Dodaj ucznia</h3>
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
      <button type="button" onClick={handleAddStudent}>
        Dodaj ucznia
      </button>

      <h4>Dodani uczniowie ({students.length}):</h4>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.id}: {s.answers.join(",")}
          </li>
        ))}
      </ul>

      <button onClick={handleSubmitAll}>Zatwierdź wszystkich</button>
    </div>
  );
};