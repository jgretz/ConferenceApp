import { SESSION_SELECTED } from '../actions';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION_SELECTED:
      return action.payload;

    default:
      return state;
  }
};
