import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import routingMiddleware from '../middleware/routingMiddleware'


const configureStore = preLoadedState => {
  return createStore(
    rootReducer,
    preLoadedState,
    compose(
      applyMiddleware(thunk, routingMiddleware)
    )
  );
};

export default configureStore
