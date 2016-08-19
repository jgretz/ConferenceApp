import { DISPLAY_MAP } from '../actions';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISPLAY_MAP:
      return action.payload;

    default:
      return state;
  }
};
