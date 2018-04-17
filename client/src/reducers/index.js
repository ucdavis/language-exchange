import { combineReducers } from "redux";
import languageReducer from "./languageReducer";
import userReducer from "./userReducer";
import userLanguageReducer from "./userLanguageReducer";
import messageReducer from "./messageReducer";
import abilityReducer from "./abilityReducer";
import reportReducer from "./reportReducer";
import { reducer as formReducer } from 'redux-form';

const allReducers = combineReducers({
    languageState: languageReducer,
    userState: userReducer,
    userLanguageState: userLanguageReducer,
    messageState: messageReducer,
    abilityState: abilityReducer,
    reportState: reportReducer,
    form: formReducer
});

export default allReducers;