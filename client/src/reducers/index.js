import { combineReducers } from "redux";
import languageReducer from "./languageReducer";
import { reducer as formReducer } from 'redux-form';

const allReducers = combineReducers({
    languageState: languageReducer,
    form: formReducer
});

export default allReducers;