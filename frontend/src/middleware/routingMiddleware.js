import { logout } from '../actions/auth';

const checkIfAuthError = result =>
  result.error && result.error.code === 'AUTHORIZATION_REQUIRED';
const routingMiddleware = store => next => action => {
  const oldState = store.getState();
  const result = next(action);
  if (checkIfAuthError(result)) {
    store.dispatch(logout(action, store.getState, oldState));
  }
  return result;
};
export default routingMiddleware;
