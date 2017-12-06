import { combineReducers } from "redux";
import languageReducer from "./languageReducer";

const reducers = combineReducers({
    languages: languageReducer
});

export default reducers;