import { configureStore } from "@reduxjs/toolkit";
import testConfigReducer from "../features/testConfig/testConfigSlice";
import studentsReducer from "../features/students/studentsSlice";

export const store = configureStore({
  reducer: {
    testConfig: testConfigReducer,
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;