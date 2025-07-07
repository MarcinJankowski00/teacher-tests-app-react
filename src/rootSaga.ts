import { all } from "redux-saga/effects";
import testCheckerSaga from "./features/TestChecker/TestCheckerSaga";
import { languageSaga } from "./features/LanguageSwitcher/languageSaga";

export default function* rootSaga() {
  yield all([
    testCheckerSaga(), 
    languageSaga()
  ]);
}