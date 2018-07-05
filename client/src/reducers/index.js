import { combineReducers } from "redux";
import languageReducer from "./languageReducer";
import userReducer from "./userReducer";
import userLanguageReducer from "./userLanguageReducer";
import messageReducer from "./messageReducer";
import abilityReducer from "./abilityReducer";
import reportReducer from "./reportReducer";
import { reducer as formReducer } from 'redux-form';
import flashMessageReducer from "./flashMessageReducer";

const appReducer = combineReducers({
    languageState: languageReducer,
    userState: userReducer,
    userLanguageState: userLanguageReducer,
    messageState: messageReducer,
    abilityState: abilityReducer,
    flashMessage: flashMessageReducer,
    reportState: reportReducer,
    form: formReducer
});

const allReducers = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      state = undefined
    }
  
    return appReducer(state, action)
  }

export default allReducers;