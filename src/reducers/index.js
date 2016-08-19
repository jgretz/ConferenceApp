import { combineReducers } from 'redux';

import sessions from './sessions';
import selectedSession from './selected_session';
import mapIsDisplayed from './map_is_displayed';

const rootReducer = combineReducers({
  sessions,
  selectedSession,
  mapIsDisplayed,
});

export default rootReducer;
