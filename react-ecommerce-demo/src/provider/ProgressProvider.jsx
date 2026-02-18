import { ProgressContext } from "@/context/ProgressContext";
import { useReducer } from "react";
import { ACTION_TYPES } from "./ActionTypes";

const initialState = {
  progress: ["products"],
  formData: {},
};

function progressReducer(currentState=initialState, action) {
  let newState;

  switch (action.type) {
    case ACTION_TYPES.COMPLETED:
      if (!currentState.progress.includes(action.payload)) {
         newState = {
        ...currentState,
        progress: [...currentState.progress, action.payload],
      };
      
      }
      else newState = currentState;
    break;
    
    case ACTION_TYPES.CLEAR_FORM_DATA:
      newState = {... initialState };
    break;

    case ACTION_TYPES.SAVE_FORM_DATA:
      newState = {
        ...currentState,
        formData: { ...currentState.formData, ...action.payload },
      };
    break;

    default:
      newState = currentState;
      break;
  }
  return newState;
}

function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer( progressReducer, initialState);

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
}

export default ProgressProvider;
