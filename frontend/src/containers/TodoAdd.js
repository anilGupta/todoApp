/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ArrowBack } from 'styled-icons/material';
import { createTodo } from '../actions/todo';
import TodoListHeaderStyle from '../component/styles/TodoListHeaderStyle';
import TodoForm from '../component/TodoForm';
import Columns from '../component/styles/Columns';

@connect(
  state => ({ todo: state.todo }),
  dispatch =>
    bindActionCreators(
      {
        createTodo,
      },
      dispatch,
    ),
)
class TodoAdd extends PureComponent {
  render() {
    const {
      todo: { todoError = false, todoErrorDetails },
      history,
    } = this.props;

    return (
      <div>
        <TodoListHeaderStyle>
          <h3>Todo Add</h3>
          <div className="actions">
            <NavLink to="/">
              <ArrowBack size="24" title="todos" /> &nbsp; Back
            </NavLink>
          </div>
        </TodoListHeaderStyle>
        <Columns>
          <TodoForm
            loading={false}
            error={todoError}
            errorDetails={todoErrorDetails}
            data={{}}
            handleSubmit={this.props.createTodo}
            history={history}
          />
        </Columns>
      </div>
    );
  }
}

export default TodoAdd;
