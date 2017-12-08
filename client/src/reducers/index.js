import { combineReducers } from "redux";
import languageReducer from "./languageReducer";
import activeLanguage from "./activeLanguage";

const allReducers = combineReducers({
    languages: languageReducer,
    activeLanguage
});

export default allReducers;