import { types } from '../constants/ActionType';
import network from '../utils/network';
import Storage from '../utils/storage';
import urls from '../constants/Urls';

const
    initialize = () => {
        return (dispatch) => {
            const passcode = Storage.get('passcode'),
                  auth = Storage.get('auth');
                  if(auth){
                     const user = Storage.get("user");
                     return dispatch(receiveAuth(user, auth));
                  }else{
                    return dispatch(initAuth(false));
                  }
        }
    },
    initAuth = authStatus => {
        return {
            type: types.AUTH_STATUS,
            authStatus
        }
    },
    authenticate  = (auth={ username: '', password: ''}) => {
        	return (dispatch) => {
            	dispatch(requestAuth());
            	return dispatch(checkAuth(auth))
        	}
    	},
    	checkAuth =  ({username, password})  =>{
        	return dispatch => {
            	const body = { username, password };
            	return network.post(urls.auth, body).then(result => {
                	const auth = result.token ? result.token: false,
                      	 user = auth ? { profile : result.user, token:result.token }: {};
                         Storage.set("auth", auth);
				                 Storage.set("user", auth ? {token : result.token }: {});
                         dispatch(receiveAuth(user, auth));
                         return Promise.resolve(result);
                  });
        }
    	},
    requestAuth = () => {
        return {
            type: types.AUTH_REQUEST,
            loading: true,
        }
    },
    receiveAuth = (user, authenticated)=> {
        return {
            type: types.AUTH_RECEIVE,
            loading: false,
            user,
            authenticated,
        }
    },
    logout = () => {
	    	return (dispatch, getState) => {
			  const { auth: { user: { token }}} = getState();
            	Storage.delete('auth');
            	Storage.delete('user');
            	network.post(urls.logout, {}, token).then(res => {
				      dispatch({
                    	type: types.AUTH_RESET
                	})
            	})
              return Promise.resolve(true);
        	}
    };

export  {
    initialize,
    authenticate,
    logout
}
