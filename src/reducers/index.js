import { combineReducers } from 'redux';

import sessions from './sessions';
import selectedSession from './selected_session';

const rootReducer = combineReducers({
  sessions,
  selectedSession,
});

export default rootReducer;
