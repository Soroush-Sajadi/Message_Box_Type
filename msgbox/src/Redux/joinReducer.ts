// import { type } from "os"

interface JoinState {
  newUser: string[]
}
const initialState = {
  newUser: []
}

type Action = {type: "JOIN_USER", payload: string}

export const joinReducer = (state:JoinState = initialState, action: Action) => {
  switch(action.type) {
    case "JOIN_USER": {
      return {...state, newUser: [...state.newUser, action.payload]}
    }
    default: 
      return state
  }
}