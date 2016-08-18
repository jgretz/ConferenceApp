import { LOAD_SCHEDULE_SUCCESS } from '../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_SCHEDULE_SUCCESS:
      return action.payload.data;

    default:
      return state;
  }
};
