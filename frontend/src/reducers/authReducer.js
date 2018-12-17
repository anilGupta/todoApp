import { types } from '../constants/ActionType';


const
    initialState = {
        authenticated: null,
        loading: false,
        error: false,
        user: {},

    },
    authReducer = (state = initialState, action) =>{

        switch (action.type) {
            case types.AUTH_REQUEST: {
                return Object.assign({}, state, { loading: true, error: false})
            }

            case types.AUTH_RECEIVE: {
                return Object.assign({}, state, {
                    authenticated: action.authenticated,
                    loading:false,
                    user : action.user,
                    error: action.authenticated ? false : "Invalid Credential"
                });
            }

            case types.AUTH_STATUS: {
                return Object.assign({}, state, { authenticated: action.authStatus})
            }

            case types.AUTH_RESET: {
               return Object.assign({}, initialState, { authenticated: false})
            }



	       case types.SIGNUP_REQUEST:
     		     return Object.assign({}, state, { signupLoading: true });

         case types.SIGNUP_RECEIVE:
             return Object.assign({}, state, { signupLoading: false });

            default:
                return state;
        }
    };

export default authReducer;
