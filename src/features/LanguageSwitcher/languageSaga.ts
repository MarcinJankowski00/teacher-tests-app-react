import { takeLatest, call } from "redux-saga/effects";
import { setLanguage } from "./languageSlice";
import i18n from "../../i18n";

function* handleLanguageChange(action: ReturnType<typeof setLanguage>) {
  const lang = action.payload;
  yield call([i18n, i18n.changeLanguage], lang);
  yield call([localStorage, 'setItem'], "language", lang);
}

export function* languageSaga() {
  yield takeLatest(setLanguage.type, handleLanguageChange);
}