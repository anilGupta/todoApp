import { types } from '../constants/ActionType';
import network from '../utils/network';
import Storage from '../utils/storage';
import urls from '../constants/Urls';

const initialize = () => dispatch => {
    const token = Storage.get('token');
    if (token) {
      const user = Storage.get('user');
      return dispatch(receiveAuth(user, token));
    }
    return dispatch(initAuth(false));
  },
  initAuth = authStatus => ({
    type: types.AUTH_STATUS,
    authStatus,
  }),
  authenticate = (auth = { username: '', password: '' }) => dispatch => {
    dispatch(requestAuth());
    return dispatch(checkAuth(auth));
  },
  checkAuth = ({ username, password }) => dispatch => {
    const body = username.includes('@')
      ? { email: username, password }
      : { username, password };
    return network.post(urls.login, body).then(res => {
      const { id = false, user = {} } = res;
      Storage.set('token', id ? id.replace(/"/g, '') : false);
      Storage.set('user', user);
      dispatch(receiveAuth(user, id));
      return Promise.resolve({ id, user });
    });
  },
  requestAuth = () => ({
    type: types.AUTH_REQUEST,
    loading: true,
  }),
  receiveAuth = (user, token) => ({
    type: types.AUTH_RECEIVE,
    loading: false,
    user,
    token,
  }),
  createUser = data => (dispatch, getState) =>
    network.post(urls.signup, data).then(res => {
      if (res.error) {
        return dispatch({
          type: types.SIGNUP_RECEIVE_ERROR,
          error: res.error.details
            ? res.error.details.messages
            : { failed: res.error.message },
        });
      }
      dispatch({
        type: types.SIGNUP_RECEIVE,
        auth: res,
      });
      return Promise.resolve(true);
    }),
  logout = () => (dispatch, getState) => {
    const {
      auth: { token },
    } = getState();
    Storage.delete('token');
    Storage.delete('user');
    network.post(urls.getByName('logout', token), {}).then(res => {
      dispatch({
        type: types.AUTH_RESET,
      });
    });
    return Promise.resolve(true);
  };

export { initialize, authenticate, createUser, logout };
