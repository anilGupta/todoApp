import { logout } from '../actions/auth'

const checkIfAuthError = (result) =>{
        const found = ['customer', 'data', 'value'].find(key => {
            const value = result[key];
            return typeof value == 'object' && value.length && typeof value[0] == 'string' && value[0].includes('token_expired')
        });
        return !!found
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
