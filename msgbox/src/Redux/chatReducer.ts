 
export interface Chat {
    user: string
    text: string
  }
  const initialState: Chat[] = [];
 
  type Action = {type: "ADD_MSGS_CHAT" | "REMOVE_ALL_MESSAGES", payload: string}

export const chatReducer = (state: Chat[]= initialState , action: Action) => {
  switch(action.type) {
    case "ADD_MSGS_CHAT": {
      return [ ...state, action.payload]
    }
    case "REMOVE_ALL_MESSAGES": {
      return initialState;
    }
    default: 
      return state
  }
}