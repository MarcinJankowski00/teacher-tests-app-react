import { all } from "redux-saga/effects";
import testCheckerSaga from "./features/TestChecker/TestCheckerSaga";

export function* rootSaga() {
  yield all([testCheckerSaga()]);
}