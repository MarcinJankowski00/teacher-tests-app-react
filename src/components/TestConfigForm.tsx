import React, { useState } from "react";
import type { TestConfig } from "../types";

type Props = {
  onSubmit: (config: TestConfig) => void;
};

export const TestConfigForm: React.FC<Props> = ({ onSubmit }) => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [answerKey, setAnswerKey] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answers = answerKey.trim().split(",");
    if (answers.length !== numberOfQuestions) {
      alert("Liczba odpowiedzi musi odpowiadać liczbie pytań.");
      return;
    }
    onSubmit({ numberOfQuestions, answerKey: answers });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Liczba pytań:
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Klucz odpowiedzi (np. A,B,C,D,...):
        <input
          type="text"
          value={answerKey}
          onChange={(e) => setAnswerKey(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Zatwierdź</button>
    </form>
  );
};