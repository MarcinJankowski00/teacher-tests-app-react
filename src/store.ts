import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import testConfigReducer from "./features/TestChecker/TestConfig/testConfigSlice";
import studentsReducer from "./features/TestChecker/Students/studentsSlice";
import languageReducer from "./features/LanguageSwitcher/languageSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    testConfig: testConfigReducer,
    students: studentsReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;