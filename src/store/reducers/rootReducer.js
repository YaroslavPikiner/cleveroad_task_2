import { initialState } from "./initialState";
import { ACTION_LOGIN, SIGNOUT,ACTION_REG} from "../types";

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOGIN:
      return { ...state, isLogged: true };
    case SIGNOUT: {
      return { ...state, isLogged: false }; 
    }
    case ACTION_REG:
      return {...state, isLogged: true };
    default:
      return state;
  }
}
export default rootReducer;
