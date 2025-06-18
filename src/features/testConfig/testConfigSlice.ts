import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TestConfigState {
  numberOfQuestions: number;
  answerKey: string[];
}

const initialState: TestConfigState = {
  numberOfQuestions: 0,
  answerKey: [],
};

const testConfigSlice = createSlice({
  name: "testConfig",
  initialState,
  reducers: {
    setTestConfig: (
      state,
      action: PayloadAction<{ numberOfQuestions: number; answerKey: string[] }>
    ) => {
      state.numberOfQuestions = action.payload.numberOfQuestions;
      state.answerKey = action.payload.answerKey;
    },
    resetTestConfig: (state) => {
      state.numberOfQuestions = 0;
      state.answerKey = [];
    },
  },
});

export const { setTestConfig, resetTestConfig } = testConfigSlice.actions;

export default testConfigSlice.reducer;