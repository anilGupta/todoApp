/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { ArrowBack, Delete, Archive, Unarchive } from 'styled-icons/material';
import { fetchTodoListIfNeeded, updateTodo, removeTodo } from '../actions/todo';
import { Spinner } from '../component/Index';
import TodoListHeaderStyle from '../component/styles/TodoListHeaderStyle';
import TodoForm from '../component/TodoForm';
import Columns from '../component/styles/Columns';

@connect(
  state => ({ todo: state.todo }),
  dispatch =>
    bindActionCreators(
      {
        updateTodo,
        removeTodo,
        fetchTodoListIfNeeded,
      },
      dispatch,
    ),
)
class TodoEdit extends Component {
  constructor(props) {
    super(props);
    this.handleAction = this.handleAction.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.fetchTodoListIfNeeded();
  }

  handleAction(todo, action) {
    switch (action) {
      case 'delete':
        return this.props.removeTodo(todo).then(() => {
          toast('Todo Removed Successfully');
          setTimeout(() => {
            this.props.history.push('/');
          }, 2000);
        });
      case 'archive':
        return this.props
          .updateTodo(Object.assign({}, todo, { archive: !todo.archive }))
          .then(() => toast(`Todo ${todo.archive ? 'Restored' : 'Archived'}`));
      default:
        return false;
    }
  }

  render() {
    const {
      todo: { items, loading, todoError = false, todoErrorDetails },
      match: { params },
      history,
    } = this.props;
    const todo = items.find(item => item.id === +params.id);
    const activeTodo = todo || false;
    if (loading || !activeTodo) {
      return (
        <div>
          <Spinner />
          <ToastContainer hideProgressBar />
        </div>
      );
    }

    return (
      <div>
        <TodoListHeaderStyle>
          <h3>Todo Edits</h3>
          <div className="actions">
            <NavLink
              to="#"
              onClick={this.handleAction.bind(this, activeTodo, 'archive')}
            >
              {activeTodo.archive ? (
                <Unarchive size="18" title="un-archive todos" />
              ) : (
                <Archive size="18" title="archive todos" />
              )}
              &nbsp;{activeTodo.archive ? 'Restore' : 'Archive'}
            </NavLink>
            <NavLink
              to="#"
              className="danger"
              onClick={this.handleAction.bind(this, activeTodo, 'delete')}
            >
              <Delete size="18" title="archive todos" /> &nbsp;Delete
            </NavLink>
            <NavLink to="/">
              <ArrowBack size="24" title="todos" /> &nbsp; Back
            </NavLink>
          </div>
        </TodoListHeaderStyle>
        <Columns>
          <TodoForm
            error={todoError}
            errorDetails={todoErrorDetails}
            loading={loading || !activeTodo}
            data={activeTodo}
            handleSubmit={this.props.updateTodo}
            history={history}
          />
        </Columns>
      </div>
    );
  }
}

export default TodoEdit;
