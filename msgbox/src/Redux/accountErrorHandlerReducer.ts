 
type Action = {type: "ERROR", payload: string}

export const accountErrorHandlerReducer = (state: string = '', action: Action) => {
  switch(action.type) {
    case "ERROR": {
      return  action.payload
    }
    default: 
      return state
  }
}