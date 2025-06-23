import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GradeThreshold, TestConfig } from "../../../types";


const initialState: TestConfig = {
  numberOfQuestions: 0,
  numberOfRows: 1,
  answerKey: [],
  gradeScale: [
    { grade: "1", threshold: 0 },
    { grade: "2", threshold: 30 },
    { grade: "3", threshold: 50 },
    { grade: "4", threshold: 75 },
    { grade: "5", threshold: 85 },
    { grade: "6", threshold: 95 },
  ]
};

const testConfigSlice = createSlice({
  name: "testConfig",
  initialState,
  reducers: {
    setTestConfig: (
      state,
      action: PayloadAction<{
        numberOfQuestions: number;
        numberOfRows: number;
        answerKey: string[][];
        gradeScale: GradeThreshold[];
      }>
    ) => {
      state.numberOfQuestions = action.payload.numberOfQuestions;
      state.numberOfRows = action.payload.numberOfRows;
      state.answerKey = action.payload.answerKey;
      state.gradeScale = action.payload.gradeScale;
    },
    resetTestConfig: (state) => {
      state.numberOfQuestions = 0;
      state.numberOfRows = 1;
      state.answerKey = [];
      state.gradeScale= [
    { grade: "1", threshold: 0 },
    { grade: "2", threshold: 30 },
    { grade: "3", threshold: 50 },
    { grade: "4", threshold: 75 },
    { grade: "5", threshold: 85 },
    { grade: "6", threshold: 95 },
  ]
    },
  },
});

export const { setTestConfig, resetTestConfig } = testConfigSlice.actions;

export default testConfigSlice.reducer;