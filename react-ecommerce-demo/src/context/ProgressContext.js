import { createContext } from "react"


export const ProgressContext = createContext({
  state: { formData: {} },
  dispatch: () => {}, 
});