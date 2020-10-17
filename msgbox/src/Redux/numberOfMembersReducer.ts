 
type Action = {type: "MEMBER_COUNTER", payload: number}

export const numberOfMembersReducer = (state: number = 0, action: Action) => {
  switch(action.type) {
    case "MEMBER_COUNTER": {
      return  action.payload
    }
    default: 
      return state
  }
}