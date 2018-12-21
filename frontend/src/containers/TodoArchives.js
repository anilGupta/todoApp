import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchTodoListIfNeeded, removeTodo, updateTodo } from '../actions/todo';
import { Spinner, TodoItem } from '../component';
import TodoListHeaderStyle from '../component/styles/TodoListHeaderStyle';
import Columns from '../component/styles/Columns';
import { ToastContainer, toast } from 'react-toastify';
import {Add, Archive} from 'styled-icons/material';


@connect(
  state =>{ return {todo: state.todo }},
  dispatch => ( bindActionCreators({
    fetchTodoListIfNeeded,
    removeTodo,
    updateTodo
  }, dispatch))
)
class TodoArchives extends Component{

  constructor(props){
     super(props);
     this.handleAction = this.handleAction.bind(this);
  }

  fetchData(props){
     const { fetchTodoListIfNeeded } = props;
     fetchTodoListIfNeeded();
  }

  componentWillMount(){
     this.fetchData(this.props);
  }

  handleAction(todo, action){
     switch(action){
       case "delete":
         return this.props.removeTodo(todo).then(res => toast("Todo Removed Successfully"));
       case "archive":
         return this.props.updateTodo(Object.assign({}, todo, { archive: !todo.archive })).then(res => toast(`Todo ${todo.archive ? 'Restored': 'Archived'}`));
     }
  }

  render() {

    const { todo : { loading, items }} = this.props;

    if(loading){
      return <Spinner />
    }

    return (
       <div>
         <TodoListHeaderStyle>
             <h3>Archived Todo List</h3>
             <div className="actions">
               <NavLink to="/"><Archive size="24" title="todos" /> &nbsp; Back</NavLink>
             </div>
         </TodoListHeaderStyle>
         <Columns>
           {items.filter(todo => todo.archive).map(todo => {
             return <TodoItem {...todo} key={todo.id} handleAction={this.handleAction.bind(this, todo)}  />
           })}
           <ToastContainer hideProgressBar={true} />
         </Columns>
       </div>

    );
  }
}

export default TodoArchives;
