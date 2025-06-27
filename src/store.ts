import { configureStore } from "@reduxjs/toolkit";
import testConfigReducer from "./features/TestChecker/TestConfig/testConfigSlice";
import studentsReducer from "./features/TestChecker/Students/studentsSlice";
import createSagaMiddleware from "redux-saga";
import testCheckerSaga from "./features/TestChecker/TestCheckerSaga";

const sagaMiddleware= createSagaMiddleware();

export const store = configureStore({
  reducer: {
    testConfig: testConfigReducer,
    students: studentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(testCheckerSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;