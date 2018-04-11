import {FLASH_MESSAGE} from '../actions/flashMessageActions';

const initialState = {  
    message: null,
    className: null,
    img:null
  }
  
  export default (state = initialState, action) => {  
    switch(action.type){
      case FLASH_MESSAGE:
        return action.payload;
      default:
        return state;
    }
  };