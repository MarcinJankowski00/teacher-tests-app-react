import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { setTestConfig } from "./testConfigSlice";
import type { TestConfig, GradeThreshold } from "../../../types";
import { Button, Div, Form, Input, KeyInput, Label, Wrapper } from "../styled";

type Props = {
  onSubmit: (config: TestConfig) => void;
};

export const TestConfigForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.testConfig);

  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [numberOfRows, setNumberOfRows] = useState(1);
  const [answerKey, setAnswerKey] = useState<string[]>([""]);

  const [gradeScaleSize, setGradeScaleSize] = useState(6); // domyślnie 5 ocen
  const [gradeScale, setGradeScale] = useState<GradeThreshold[]>([]);

  // Wczytaj dane z Reduxa jeśli istnieją
  useEffect(() => {
    if (config) {
      setNumberOfQuestions(config.numberOfQuestions);
      setNumberOfRows(config.numberOfRows || 1);
      const mergedAnswerKey = Array.from({ length: config.numberOfRows || 1 }, (_, i) =>
        config.answerKey[i]?.join(",") || ""
      );
      setAnswerKey(mergedAnswerKey);

      if (config.gradeScale) {
        setGradeScale(config.gradeScale);
        setGradeScaleSize(config.gradeScale.length);
      }
    }
  }, [config]);

  // Dynamicznie dopasuj skalę ocen
  useEffect(() => {
    setGradeScale((prev) => {
      const updated = [...prev];
      while (updated.length < gradeScaleSize) {
        updated.push({ grade: "", threshold: 0 });
      }
      while (updated.length > gradeScaleSize) {
        updated.pop();
      }
      return updated;
    });
  }, [gradeScaleSize]);

  const handleAnswerChange = (rowIndex: number, value: string) => {
    const updated = [...answerKey];
    updated[rowIndex] = value;
    setAnswerKey(updated);
  };

  const handleGradeChange = (index: number, field: "grade" | "threshold", value: string | number) => {
    const updated = [...gradeScale];
    updated[index] = {
      ...updated[index],
      [field]: field === "threshold" ? Number(value) : String(value),
    };
    setGradeScale(updated);
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

    const sortedGradeScale = [...gradeScale].sort((a, b) => b.threshold - a.threshold); // od najwyższych progów

    const finalConfig: TestConfig = {
      numberOfQuestions,
      numberOfRows,
      answerKey: parsedAnswerKey,
      gradeScale: sortedGradeScale,
    };

    dispatch(setTestConfig(finalConfig));
    onSubmit(finalConfig);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Wrapper>
      <Div>
        <h3>Test:</h3>
        <Label short={true}>
          <label htmlFor="rows">
            Liczba pytań:
          </label>
          <Input
            id="rows"
            type="number"
            min={1}
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          />
        </Label>
        <Label short={true}>
          <label htmlFor="rows">
            Liczba rzędów:
          </label>
          <Input
            id="rows"
            type="number"
            min={1}
            value={numberOfRows}
            onChange={(e) => setNumberOfRows(Number(e.target.value))}
          />
        </Label>

        {Array.from({ length: numberOfRows }, (_, i) => (
          <Label key={i}>
            <label htmlFor="rows">
              Klucz odpowiedzi – rząd {i + 1}:
              <br />
            </label>
            <KeyInput
              id="rows"
              type="text"
              value={answerKey[i] || ""}
              placeholder="np. a,b,c"
              onChange={(e) => handleAnswerChange(i, e.target.value)}
            />
          </Label>
        ))}
        <br />
      </Div>
      <Div>
        <h3>Skala ocen:</h3>
        <Label>
          <label>
            Ile ocen w skali?
            <Input
              type="number"
              min={2}
              max={10}
              value={gradeScaleSize}
              onChange={(e) => setGradeScaleSize(Number(e.target.value))}
            />
          </label>
        </Label>
        {gradeScale.map((grade, i) => (
          <div key={i} style={{ marginBottom: "0.5rem" }}>
            <Label>
              <label>
                Ocena #{i + 1}:{" "}
                <Input
                  type="text"
                  placeholder="np. 5 lub A"
                  value={grade.grade}
                  onChange={(e) => handleGradeChange(i, "grade", e.target.value)}
                />
                od:{" "}
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={grade.threshold}
                  onChange={(e) => handleGradeChange(i, "threshold", e.target.value)}
                />{" "}
                %
              </label>
            </Label>
          </div>
        ))}
      </Div>
      </Wrapper>
      <br />
      <Button type="submit">Zatwierdź</Button>
    </Form >
  );
};
