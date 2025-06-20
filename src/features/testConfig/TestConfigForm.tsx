import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setTestConfig } from "../../features/testConfig/testConfigSlice";
import type { TestConfig } from "../../types";

type Props = {
  onSubmit: (config: TestConfig) => void;
};

export const TestConfigForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.testConfig);

  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [numberOfRows, setNumberOfRows] = useState(1);
  const [answerKey, setAnswerKey] = useState<string[]>([""]);

  // Jeśli mamy dane z Reduxa, ustaw je
  useEffect(() => {
    if (config) {
      setNumberOfQuestions(config.numberOfQuestions);
      setNumberOfRows(config.numberOfRows || 1);
      setAnswerKey(
        config.answerKey.map((row) => row.join(","))
      );
    }
  }, [config]);

  // Obsługa zmiany liczby rzędów
  useEffect(() => {
    setAnswerKey((prev) => {
      const updated = [...prev];
      while (updated.length < numberOfRows) updated.push("");
      while (updated.length > numberOfRows) updated.pop();
      return updated;
    });
  }, [numberOfRows]);

  const handleAnswerChange = (rowIndex: number, value: string) => {
    const updated = [...answerKey];
    updated[rowIndex] = value;
    setAnswerKey(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAnswerKey: string[][] = [];

    for (let i = 0; i < numberOfRows; i++) {
      const answers = answerKey[i].split(",").map((a) => a.trim());
      if (answers.length !== numberOfQuestions) {
        alert(`Rząd ${i + 1}: liczba odpowiedzi musi być równa liczbie pytań.`);
        return;
      }
      parsedAnswerKey.push(answers);
    }

    const finalConfig: TestConfig = {
      numberOfQuestions,
      numberOfRows,
      answerKey: parsedAnswerKey,
    };

    dispatch(setTestConfig(finalConfig));
    onSubmit(finalConfig);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Liczba pytań:
        <input
          type="number"
          min={1}
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Liczba rzędów:
        <input
          type="number"
          min={1}
          value={numberOfRows}
          onChange={(e) => setNumberOfRows(Number(e.target.value))}
        />
      </label>
      <br />

      {Array.from({ length: numberOfRows }, (_, i) => (
        <div key={i}>
          <label>
            Klucz odpowiedzi – rząd {i + 1}:
            <input
              type="text"
              value={answerKey[i] || ""}
              onChange={(e) => handleAnswerChange(i, e.target.value)}
            />
          </label>
        </div>
      ))}

      <br />
      <button type="submit">Zatwierdź</button>
    </form>
  );
};
