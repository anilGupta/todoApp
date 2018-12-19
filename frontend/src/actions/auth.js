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
            	return network.post(urls.login, body).then(res => {
            	           const {id=false, user={}} = res;
                         Storage.set("token", id ? id.replace(/"/g, ''): false);
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
    createUser = data => {
       return (dispatch, getState) => {
         return network.post(urls.signup, data).then(res => {
            if(res.error){
               dispatch({
                  type: types.SIGNUP_RECEIVE_ERROR,
                  error: res.error.details ? res.error.details.messages: { "failed": res.error.message }
               })
            }
         });
       }
    },
    logout = () => {
	    	return (dispatch, getState) => {
			  const { auth: { token }} = getState();
            	Storage.delete('token');
            	Storage.delete('user');
            	network.post(urls.getByName('logout', token), {}).then(res => {
				          dispatch({
                    	type: types.AUTH_RESET
                	})
            	});
              return Promise.resolve(true);
        	}
    };

export  {
    initialize,
    authenticate,
    createUser,
    logout
}
