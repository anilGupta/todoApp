import { types } from '../constants/ActionType';
import network from '../utils/network';
import Storage from '../utils/storage';
import urls from '../constants/Urls';

const
    initialize = () => {
        return (dispatch) => {
            const token = Storage.get('token');
                  if(token){
                     const user = Storage.get("user");
                     return dispatch(receiveAuth(user, token));
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
            	return network.post(urls.login, body).then(({id=false, user={}}) => {
                         Storage.set("token", id.replace(/"/g, ''));
				                 Storage.set("user", user);
                         dispatch(receiveAuth(user, id));
                         return Promise.resolve({id, user});
                  });
        }
    },
    requestAuth = () => {
        return {
            type: types.AUTH_REQUEST,
            loading: true,
        }
    },
    receiveAuth = (user, token)=> {
        return {
            type: types.AUTH_RECEIVE,
            loading: false,
            user,
            token,
        }
    },
    logout = () => {
	    	return (dispatch, getState) => {
			  const { auth: { token }} = getState();
            	Storage.delete('token');
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
