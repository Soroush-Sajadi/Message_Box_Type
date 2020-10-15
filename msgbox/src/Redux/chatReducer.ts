 
export interface Chat {
    user: string
    text: string
  }
  const initialState: Chat[] = [
    
    
  ];
 
  type Action = {type: "ADD_MSGS_CHAT", payload: string}

export const chatReducer = (state: Chat[]= initialState , action: Action) => {
  switch(action.type) {
    case "ADD_MSGS_CHAT": {
      return [ ...state, action.payload]
    }
    default: 
      return state
  }
}