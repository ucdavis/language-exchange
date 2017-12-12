import { combineReducers } from "redux";
import languageReducer from "./languageReducer";

const allReducers = combineReducers({
    languageState: languageReducer,
});

export default allReducers;