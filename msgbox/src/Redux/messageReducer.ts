// export interface Message {
//      string
//   }
// const initialState = 
//     { 
//     text: '' 
//     };
 
  type Action = {type: "ADD_MSG_CHAT", payload: string}

export const messageReducer = (state: string = '', action: Action) => {
  switch(action.type) {
    case "ADD_MSG_CHAT": {
      return  action.payload
    }
    default: 
      return state
  }
}