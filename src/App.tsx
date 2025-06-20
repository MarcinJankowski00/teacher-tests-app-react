import React, { useState } from "react";
import { useAppSelector} from "./hooks/useAppSelector"; 
import { useAppDispatch} from "./hooks/useAppDispatch";// Twoje typed hooki
import { TestConfigForm } from "./features/testConfig/TestConfigForm";
import { StudentForm } from "./features/students/StudentForm";
import { Results } from "./components/Results";

import { setTestConfig } from "./features/testConfig/testConfigSlice";
import {
  setStudents,
} from "./features/students/studentsSlice";

const App: React.FC = () => {
  const [step, setStep] = useState<"config" | "students" | "results">("config");

  const dispatch = useAppDispatch();

  // Pobieramy z store
  const testConfig = useAppSelector((state) => state.testConfig);
  const students = useAppSelector((state) => state.students.list);

  // Funkcja do zatwierdzania konfiguracji testu
 const handleConfigSubmit = (config: { numberOfQuestions: number; numberOfRows: number; answerKey: string[][] }) => {
  dispatch(setTestConfig(config));
  setStep("students");
};

  // Funkcja do zatwierdzania listy uczniów i przejścia do wyników
  const handleStudentsSubmit = (studentList: typeof students) => {
    dispatch(setStudents(studentList));
    setStep("results");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Aplikacja do sprawdzania testów</h1>

      {step === "config" && <TestConfigForm onSubmit={handleConfigSubmit} />}

      {step === "students" && testConfig.numberOfQuestions > 0 && (
        <StudentForm
          numberOfQuestions={testConfig.numberOfQuestions}
          numberOfRows={testConfig.numberOfRows}
          students={students}
          setStudents={(students) => dispatch(setStudents(students))}
          onSubmitAll={handleStudentsSubmit}
        />
      )}

      {step === "results" && testConfig.numberOfQuestions > 0 && (
        <Results
          students={students}
          config={testConfig}
          onBackToStudents={() => setStep("students")}
          onBackToConfig={() => setStep("config")}
        />
      )}
    </div>
  );
};

export default App;