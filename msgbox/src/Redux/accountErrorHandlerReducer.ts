 type Action = {type: "ERROR", payload: boolean}

export const accountErrorHandlerReducer = (state: boolean = false, action: Action) => {
  switch(action.type) {
    case "ERROR": {
      return  action.payload
    }
    default: 
      return state
  }
}