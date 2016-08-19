export const SESSION_SELECTED = 'SESSION_SELECTED';

export const selectSession = (session) =>
({
  type: SESSION_SELECTED,
  payload: session,
});
