/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Archive } from 'styled-icons/material';
import { fetchTodoListIfNeeded, removeTodo, updateTodo } from '../actions/todo';
import { Spinner, TodoItem } from '../component/Index';
import TodoListHeaderStyle from '../component/styles/TodoListHeaderStyle';
import Columns from '../component/styles/Columns';

@connect(
  state => ({ todo: state.todo }),
  dispatch =>
    bindActionCreators(
      {
        fetchTodoListIfNeeded,
        removeTodo,
        updateTodo,
      },
      dispatch,
    ),
)
class TodoArchives extends PureComponent {
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
        return this.props
          .removeTodo(todo)
          .then(() => toast('Todo Removed Successfully'));
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
      todo: { loading, items },
    } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div>
        <TodoListHeaderStyle>
          <h3>Archived Todo List</h3>
          <div className="actions">
            <NavLink to="/">
              <Archive size="24" title="todos" /> &nbsp; Back
            </NavLink>
          </div>
        </TodoListHeaderStyle>
        <Columns>
          {items
            .filter(todo => todo.archive)
            .map(todo => (
              <TodoItem
                {...todo}
                key={todo.id}
                handleAction={this.handleAction.bind(this, todo)}
              />
            ))}
          <ToastContainer hideProgressBar />
        </Columns>
      </div>
    );
  }
}

export default TodoArchives;
