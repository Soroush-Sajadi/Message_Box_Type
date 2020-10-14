
import { createStore } from 'redux';
import { joinReducer } from '../Redux/joinReducer'

export const store = createStore(joinReducer);