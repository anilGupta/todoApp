import { logout } from '../actions/auth'

const checkIfAuthError = (result) =>{
        return (result.error && result.error.code === 'AUTHORIZATION_REQUIRED')
    },
    routingMiddleware = store => next => action => {
        let oldState = store.getState(),
            result = next(action);
            if(checkIfAuthError(result)){
                store.dispatch(logout(action, store.getState, oldState))
            }
        return result
    };
export default routingMiddleware;
