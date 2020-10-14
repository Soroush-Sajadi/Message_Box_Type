// import { type } from "os"

export interface JoinState {
  newUser: string[]
}
const initialState = {
  newUser: []
}

type Action = {type: "JOIN_USER", payload: string}

export const joinReducer = (state:JoinState = initialState, action: Action) => {
  switch(action.type) {
    case "JOIN_USER": {
      return {newUser: [ action.payload]}
    }
    default: 
      return state
  }
}