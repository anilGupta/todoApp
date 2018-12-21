import { types } from '../constants/ActionType';


const
    initialState = {
        authenticated: null,
        loading: false,
        error: false,
        token: null,
        user: {},
        signupLoading: false,
        signupError: false,
        signupErrorDetails: {}
    },
    authReducer = (state = initialState, action) =>{

        switch (action.type) {
            case types.AUTH_REQUEST: {
                return Object.assign({}, state, { loading: true, error: false})
            }

            case types.AUTH_RECEIVE: {
              console.log(action);

              const { token, user } = action;
                return Object.assign({}, state, {
                    authenticated: action.token,
                    loading:false,
                    token,
                    user,
                    error: token ? false : "Invalid Credential"
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
                 return Object.assign({}, initialState, { signupLoading: false });

            case types.SIGNUP_RECEIVE_ERROR:
                 return Object.assign({}, state, { signupError: true, signupErrorDetails: action.error });

            default:
                return state;
        }
    };

export default authReducer;
