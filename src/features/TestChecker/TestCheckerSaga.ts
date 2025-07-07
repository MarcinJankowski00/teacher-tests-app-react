import { takeEvery, call, select } from "redux-saga/effects";
import {
  saveStudentsLocalStorage,
  saveConfigLocalStorage,
} from "./testCheckerLocalStorage";
import type { RootState } from "../../store";
import type { TestConfig } from "../../types";
import type { Student } from "../../types";

const selectConfig = (state: RootState): TestConfig => state.testConfig;
const selectStudents = (state: RootState): Student[] => state.students.list;

function* saveConfigInLocalStorageHandler(): Generator {
  const config = yield select(selectConfig);
  yield call(saveConfigLocalStorage, config);
}

function* saveStudentsInLocalStorageHandler(): Generator {
  const students = yield select(selectStudents);
  yield call(saveStudentsLocalStorage, { list: students });
}

export default function* testCheckerSaga(): Generator {
  yield takeEvery("*", saveStudentsInLocalStorageHandler);
  yield takeEvery("*", saveConfigInLocalStorageHandler);
}
