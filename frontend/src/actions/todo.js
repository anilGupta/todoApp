import { types } from '../constants/ActionType';
import Network from '../utils/network';
import urls from '../constants/Urls';

const ContainerName = 'files';
const CleanTodoProps = todo => {
  const { attaching, attachFile, removeFile, files, ...rest } = todo;
  return rest;
};

const requestTodoList = () => ({
  type: types.TODO_LIST_REQUEST,
});

const receiveTodoList = todos => ({
  type: types.TODO_LIST_RECEIVE,
  todos,
});

const receiveTodoListError = error => ({
  type: types.TODO_LIST_RECEIVE_ERROR,
  error,
});

const fetchTodoList = () => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  dispatch(requestTodoList());
  return Network.get(urls.getByName('todos', token)).then(result =>
    result.error
      ? dispatch(receiveTodoListError(result.error))
      : dispatch(receiveTodoList(result)),
  );
};

const removeTodo = todo => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  return Network.delete(`${urls.todos}/${todo.id}?access_token=${token}`).then(
    () =>
      dispatch({
        type: types.TODO_REMOVE,
        todo,
      }),
  );
};

const fetchTodoListIfNeeded = () => (dispatch, getState) => {
  const {
    todo: { items },
  } = getState();
  return items.length ? Promise.resolve(items) : dispatch(fetchTodoList());
};

const attachTodoFiles = file => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  // eslint-disable-next-line no-undef
  const body = new FormData();
  body.append('filename', file);
  return Network.postForm(
    `${urls.upload.replace(
      'CONTAINER_NAME',
      ContainerName,
    )}/?access_token=${token}`,
    body,
  ).then(res => res);
};

const removeTodoFiles = attachment => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  return Network.delete(
    `${urls.remove.replace('CONTAINER_NAME', ContainerName)}/${
      attachment.name
    }?access_token=${token}`,
    {},
  ).then(res => res);
};

const handleAttachment = todo => dispatch => {
  const { files, attachFile, removeFile, attachment } = todo;
  if (attachFile) {
    return dispatch(attachTodoFiles(files));
  } else if (removeFile === true) {
    return dispatch(removeTodoFiles(attachment));
  }
  return Promise.resolve(true);
};

const updateTodo = todo => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  return dispatch(handleAttachment(todo)).then(({ result = {} }) => {
    if (result.files) {
      // eslint-disable-next-line no-param-reassign
      [todo.attachment] = [result.files.filename];
    }

    if (todo.removeFile) {
      // eslint-disable-next-line no-param-reassign
      delete todo.attachment;
    }

    return Network.put(
      `${urls.todos}/${todo.id}?access_token=${token}`,
      CleanTodoProps(todo),
    ).then(res =>
      dispatch({
        type: types.TODO_UPDATE,
        res,
      }),
    );
  });
};

const createTodo = todo => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  return dispatch(handleAttachment(todo)).then(({ result = {} }) => {
    if (result.files) {
      // eslint-disable-next-line no-param-reassign
      [todo.attachment] = result.files.filename;
    }

    return Network.post(
      urls.getByName('todos', token),
      CleanTodoProps(todo),
    ).then(res =>
      dispatch({
        type: types.TODO_ADD,
        todo,
        res,
      }),
    );
  });
};

export {
  fetchTodoListIfNeeded,
  removeTodo,
  updateTodo,
  createTodo,
  attachTodoFiles,
};
