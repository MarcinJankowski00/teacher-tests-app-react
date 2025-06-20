import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TestConfigState {
  numberOfQuestions: number;
  numberOfRows: number;
  answerKey: string[][]; // jeden klucz odpowiedzi na każdy rząd
}

const initialState: TestConfigState = {
  numberOfQuestions: 0,
  numberOfRows: 1,
  answerKey: [],
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
      }>
    ) => {
      state.numberOfQuestions = action.payload.numberOfQuestions;
      state.numberOfRows = action.payload.numberOfRows;
      state.answerKey = action.payload.answerKey;
    },
    resetTestConfig: (state) => {
      state.numberOfQuestions = 0;
      state.numberOfRows = 1;
      state.answerKey = [];
    },
  },
});

export const { setTestConfig, resetTestConfig } = testConfigSlice.actions;

export default testConfigSlice.reducer;