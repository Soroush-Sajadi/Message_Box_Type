 export interface Message {
    user: string
    text: string
  }
  const initialState: Message[] = [];
 
  type Action = {type: "ADD_MSGS_CHAT" | "REMOVE_ALL_MESSAGES", payload: string}

export const chatReducer = (state: Message[]= initialState , action: Action) => {
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