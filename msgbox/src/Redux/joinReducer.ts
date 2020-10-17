export interface JoinState {
  name: string
  room: string
}

const initialState =  {name:'', room:''}

type Action = {type: "JOIN_USER", payload: JoinState}

export const joinReducer = (state:JoinState = initialState , action: Action) :JoinState => {
  switch(action.type) {
    case "JOIN_USER": {
      return action.payload
    }
    default: 
      return state
  }
}