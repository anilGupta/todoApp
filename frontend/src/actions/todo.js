import { types } from '../constants/ActionType';
import Network from '../utils/network';
import urls from '../constants/Urls';

const ContainerName = 'files',
      CleanTodoProps = (todo) => {
        const {attaching, attachFile, removeFile, files, ...rest} = todo;
        return rest;
      }
const
  fetchTodoList = () => {
    return (dispatch, getState) => {
      const { auth: { token }} = getState();
      dispatch(requestTodoList());
      return Network.get(urls.getByName('todos', token)).then(result => {
           result.error
              ? dispatch(receiveTodoListError(result.error))
              : dispatch(receiveTodoList(result));
      })
    }
  },
  requestTodoList = () => {
    return {
      type : types.TODO_LIST_REQUEST
    }
  },
  receiveTodoList = todos => {
    return {
      type: types.TODO_LIST_RECEIVE,
      todos
    }
  },
  receiveTodoListError = (error) => {
    return {
      type : types.TODO_LIST_RECEIVE_ERROR,
      error
    }
  },
  createTodo = todo => {
    return (dispatch, getState) => {
      const { auth: { token }} = getState();
      return dispatch(handleAttachment(todo)).then(({result={}}) => {
        if(result.files){
            todo.attachment = result.files.filename[0]
        }

        return Network.post(urls.getByName('todos', token), CleanTodoProps(todo)).then(res => {
          return dispatch({
            type: types.TODO_ADD,
            todo,
            res
          })
        })
      })
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
      return dispatch(handleAttachment(todo)).then(({result={}}) => {
        if(result.files){
          todo.attachment = result.files.filename[0]
        }

        if(todo.removeFile){
          delete todo.attachment
        }

        return Network.put(`${urls.todos}/${todo.id}?access_token=${token}`, CleanTodoProps(todo)).then(res => {
          return dispatch({
            type: types.TODO_UPDATE,
            res
          })
        })
      })
    }
  },
  fetchTodoListIfNeeded = () => {
    return (dispatch, getState) => {
      const { todo : { items, loading }} = getState();
      return items.length ? Promise.resolve(items) : dispatch(fetchTodoList())
    }
  },
  handleAttachment = (todo) => {
    return dispatch => {
        const {files, attachFile, removeFile, attachment} = todo;
        return attachFile
          ? dispatch(attachTodoFiles(files))
          : removeFile == true
            ? dispatch(removeTodoFiles(attachment))
            : Promise.resolve(true)
      }
  },
  attachTodoFiles = (file) => {
     return (dispatch, getState) => {
       const { auth: { token }} = getState(),
               body = new FormData();
               body.append('filename', file);
               return Network.postForm(`${urls.upload.replace("CONTAINER_NAME", ContainerName)}/?access_token=${token}`, body).then(res => {
                      return res;
               })
     }
  },
  removeTodoFiles = (attachment) => {
    return (dispatch, getState) => {
      const { auth: { token }} = getState();
      return Network.delete(`${urls.remove.replace("CONTAINER_NAME", ContainerName)}/${attachment.name}?access_token=${token}`, {}).then(res => {
        return res;
      })
    }
  };


export  {
  fetchTodoListIfNeeded,
  removeTodo,
  updateTodo,
  createTodo,
  attachTodoFiles
}
