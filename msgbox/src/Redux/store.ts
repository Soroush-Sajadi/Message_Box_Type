
import { combineReducers, createStore } from 'redux';
import { joinReducer}  from './joinReducer';
import { chatReducer } from './chatReducer';
import { messageReducer } from './messageReducer';
import { ownerReducer } from './onwerReducer';
import { accountErrorHandlerReducer } from './accountErrorHandlerReducer';
import { numberOfMembersReducer } from './numberOfMembersReducer'

const rootReducer = combineReducers({
    joinReducer: joinReducer,
    chatReducer: chatReducer,
    messageReducer: messageReducer,
    ownerReducer: ownerReducer,
    accountErrorHandlerReducer: accountErrorHandlerReducer,
    numberOfMembersReducer: numberOfMembersReducer
    
  })
export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);
