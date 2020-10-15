
import { combineReducers, createStore } from 'redux';
import { joinReducer}  from './joinReducer';
import { chatReducer } from './chatReducer';
import { messageReducer } from './messageReducer'

const rootReducer = combineReducers({
    joinReducer: joinReducer,
    chatReducer: chatReducer,
    messageReducer: messageReducer
  })

export const store = createStore(rootReducer);
