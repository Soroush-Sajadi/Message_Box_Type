type Action = {type: "OWNER", payload: string}

export const ownerReducer = (state: string = '', action: Action) => {
  switch(action.type) {
    case "OWNER": {
      return  action.payload
    }
    default: 
      return state
  }
}