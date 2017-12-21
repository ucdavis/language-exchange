import { combineReducers } from "redux";
import languageReducer from "./languageReducer";
import userReducer from "./userReducer";
import { reducer as formReducer } from 'redux-form';

const allReducers = combineReducers({
    languageState: languageReducer,
    userState: userReducer,
    form: formReducer
});

export default allReducers;