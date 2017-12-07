import { combineReducers } from "redux";
import languageReducer from "./languageReducer";

const allReducers = combineReducers({
    languages: languageReducer
});

export default allReducers;