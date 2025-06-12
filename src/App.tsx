import React, { useState } from "react";
import { TestConfigForm } from "./components/TestConfigForm";
import { StudentForm } from "./components/StudentForm";
import { Results } from "./components/Results";
import type { TestConfig, Student } from "./types";

const App: React.FC = () => {
  const [step, setStep] = useState<"config" | "students" | "results">("config");
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  const handleConfigSubmit = (config: TestConfig) => {
    setTestConfig(config);
    setStudents([]); // resetuj uczniów przy zmianie konfiguracji
    setStep("students");
  };

  const handleStudentsSubmit = (studentList: Student[]) => {
    setStudents(studentList);
    setStep("results");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Aplikacja do sprawdzania testów</h1>

      {step === "config" && (
        <TestConfigForm onSubmit={handleConfigSubmit} />
      )}

      {step === "students" && testConfig && (
        <StudentForm
          numberOfQuestions={testConfig.numberOfQuestions}
          onSubmitAll={handleStudentsSubmit}
        />
      )}

      {step === "results" && testConfig && (
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
