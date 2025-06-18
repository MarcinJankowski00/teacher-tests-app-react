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

  // pobieramy dane z Reduxa
  const config = useAppSelector((state) => state.testConfig);

  // ustawiamy dane początkowe z Reduxa
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [answerKey, setAnswerKey] = useState("");

  useEffect(() => {
    if (config) {
      setNumberOfQuestions(config.numberOfQuestions);
      setAnswerKey(config.answerKey.join(","));
    }
  }, [config]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answers = answerKey.trim().split(",").map((a) => a.trim());

    if (answers.length !== numberOfQuestions) {
      alert("Liczba odpowiedzi musi odpowiadać liczbie pytań.");
      return;
    }

    dispatch(setTestConfig({ numberOfQuestions, answerKey: answers }));
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
        Klucz odpowiedzi (np. A,B,C,...):
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