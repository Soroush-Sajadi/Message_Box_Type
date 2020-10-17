
import { combineReducers, createStore } from 'redux';
import { joinReducer}  from './joinReducer';
import { chatReducer } from './chatReducer';
import { messageReducer } from './messageReducer';
import { ownerReducer } from './onwerReducer';
import { type } from 'os';

const rootReducer = combineReducers({
    joinReducer: joinReducer,
    chatReducer: chatReducer,
    messageReducer: messageReducer,
    ownerReducer: ownerReducer
  })
export type JoinState = ReturnType<typeof joinReducer>
export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);
