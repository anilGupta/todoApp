import { types } from '../constants/ActionType';
import Network from '../utils/network';
import urls from '../constants/Urls';

const ContainerName = 'files';

const
  fetchTodoList = () => {
    return (dispatch, getState) => {
      const { auth: { token }} = getState();
      dispatch(requestTodoList());
      return Network.get(urls.getByName('todos', token)).then(result => {
           dispatch(receiveTodoList(result))
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
  createTodo = todo => {
    return (dispatch, getState) => {
      const { auth: { token }} = getState();
      return dispatch(handleAttachment(todo)).then(({result={}}) => {
        if(result.files){
            todo.attachment = result.files.filename[0]
        }

        return Network.post(urls.getByName('todos', token), todo).then(res => {
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
      return handleAttachment(todo).then(attachment => {
        if(attachment){
          todo.attachments = attachment.files.filename[0]
        }

        return Network.patch(`${urls.todos}/${todo.id}?access_token=${token}`, todo).then(res => {
          return dispatch({
            type: types.TODO_UPDATE,
            todo
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
        const {files, attachFile, removeFile} = todo;
        return attachFile
          ? dispatch(attachTodoFiles(files))
          : removeFile
            ? dispatch(removeTodoFiles(files))
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
  removeTodoFiles = (file) => {
    return (dispatch, getState) => {
      const { auth: { token }} = getState();
      return Network.delete(`${urls.upload.replace("CONTAINER_NAME", ContainerName)}/files/${file.name}?access_token=${token}`, body).then(res => {
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
