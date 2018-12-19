import { types } from '../constants/ActionType';
import Network from '../utils/network';
import urls from '../constants/Urls';

const
  fetchTodoList = () => {
    return (dispatch, getState) => {
      const { auth: { token }} = getState();
      dispatch(requestTodoList());
      return Network.get(urls.getByName('todos', token)).then(result => {
           dispatch(receiveSlots(result))
      })
    }
  },
  requestTodoList = () => {
    return {
      type : types.TODO_LIST_REQUEST
    }
  },
  receiveSlots = todos => {
    return {
      type: types.TODO_LIST_RECEIVE,
      todos
    }
  },
  removeTodo = todo => {
    return (dispatch, getState) => {
       const { auth: { token }} = getState();
       return Network.delete(`${urls.todos}/${todo.id}?access_token=${token}`).then(res => {
         return dispatch({
           type: types.TODO_REMOVE,
           todo
         })
       })
    }
  },
  updateTodo = todo => {
    return (dispatch, getState) => {
      const { auth: { token }} = getState();
      return Network.patch(`${urls.todos}/${todo.id}?access_token=${token}`, todo).then(res => {
        return dispatch({
          type: types.TODO_UPDATE,
          todo
        })
      })
    }
  },
  fetchTodoListIfNeeded = () => {
    return (dispatch, getState) => {
      const { todo : { items, loading }} = getState();
      return items.length ? Promise.resolve(items) : dispatch(fetchTodoList())
    }
  };


export  {
  fetchTodoListIfNeeded,
  removeTodo,
  updateTodo
}
