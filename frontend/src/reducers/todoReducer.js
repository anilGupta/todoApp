import types from '../constants/ActionType';

const initialState = {
  items: [],
  loading: false,
  todoError: false,
  todoErrorDetails: false,
};
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TODO_LIST_REQUEST: {
      return Object.assign({}, state, { loading: true });
    }

    case types.TODO_LIST_RECEIVE: {
      return Object.assign({}, state, {
        loading: false,
        items: action.todos,
      });
    }

    case types.TODO_ADD: {
      return Object.assign({}, state, {
        items: [...state.items, action.res],
        todoError: false,
        todoErrorDetails: false,
      });
    }

    case types.TODO_REMOVE: {
      return Object.assign({}, state, {
        items: state.items.filter(item => item.id !== action.todo.id),
        todoError: false,
        todoErrorDetails: false,
      });
    }

    case types.TODO_UPDATE: {
      const todos = state.items.map(item =>
        item.id === action.res.id ? action.res : item,
      );
      return Object.assign({}, state, {
        items: todos,
        todoError: false,
        todoErrorDetails: false,
      });
    }

    default:
      return state;
  }
};

export default homeReducer;
