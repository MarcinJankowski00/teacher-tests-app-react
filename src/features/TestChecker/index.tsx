import React, { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { TestConfigForm } from "./TestConfig/TestConfigForm";
import { StudentForm } from "./Students/StudentForm";
import { Results } from "./Results/Results";
import { setTestConfig } from "./TestConfig/testConfigSlice";
import { setStudents } from "./Students/studentsSlice";
import type { TestConfig } from "../../types";
import Section from "../../common/Section";
import NavButtons from "./NavButtons";

const TestChecker: React.FC = () => {
    const [step, setStep] = useState<"config" | "students" | "results">("config");

    const dispatch = useAppDispatch();

    // Pobieramy z store
    const testConfig = useAppSelector((state) => state.testConfig);
    const students = useAppSelector((state) => state.students.list);

    // Funkcja do zatwierdzania konfiguracji testu
    const handleConfigSubmit = (config: TestConfig) => {
        dispatch(setTestConfig(config));
        setStep("students");
    };

    // Funkcja do zatwierdzania listy uczniów i przejścia do wyników
    const handleStudentsSubmit = (studentList: typeof students) => {
        dispatch(setStudents(studentList));
        setStep("results");
    };

    return (
        <>
            <div>
                <h1>Aplikacja do sprawdzania testów</h1>

                {step === "config" &&
                    <Section title="Konfiguracja testu">
                        <TestConfigForm onSubmit={handleConfigSubmit} />
                    </Section>
                }

                {step === "students" && testConfig.numberOfQuestions > 0 && (
                    <Section
                        title="Dodaj uczniów i odpowiedzi"
                        extraElementContent={
                            <NavButtons
                                onBackToStudents={() => setStep("students")}
                                onBackToConfig={() => setStep("config")}
                                step={step}
                            />
                        }
                    >
                        <StudentForm
                            numberOfQuestions={testConfig.numberOfQuestions}
                            numberOfRows={testConfig.numberOfRows}
                            students={students}
                            setStudents={(students) => dispatch(setStudents(students))}
                            onSubmitAll={handleStudentsSubmit}
                        />
                    </Section>
                )}

                {step === "results" && testConfig.numberOfQuestions > 0 && (
                    <Section
                        title="Wyniki"
                        extraElementContent={
                            <NavButtons
                                onBackToStudents={() => setStep("students")}
                                onBackToConfig={() => setStep("config")}
                                step={step}
                            />
                        }
                    >
                        <Results
                            students={students}
                            config={testConfig}
                        />
                    </Section>

                )}
            </div>
        </>
    );
};

export default TestChecker;