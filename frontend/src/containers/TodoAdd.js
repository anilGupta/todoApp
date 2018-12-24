import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createTodo, attachTodoFiles } from '../actions/todo';
import { Spinner, TodoItem } from '../component';
import TodoListHeaderStyle from '../component/styles/TodoListHeaderStyle';
import TodoForm from '../component/TodoForm';
import Columns from '../component/styles/Columns';
import { toast } from 'react-toastify';
import { ArrowBack } from 'styled-icons/material';


@connect(
  state =>{ return {todo: state.todo }},
  dispatch => ( bindActionCreators({
    createTodo,
    attachTodoFiles
  }, dispatch))
)
class TodoAdd extends Component{

  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: ''
    };
  }

  fetchData(props){
  }

  componentWillMount(){
     this.fetchData(this.props);
  }


  render() {

    const { todo : { todoLoading, todoError=false, todoErrorDetails }, createTodo, attachTodoFiles, history } = this.props;

    return (
       <div>
         <TodoListHeaderStyle>
             <h3>Todo Add</h3>
             <div className="actions">
               <NavLink to="/"><ArrowBack size="24" title="todos" /> &nbsp; Back</NavLink>
             </div>
         </TodoListHeaderStyle>
           <Columns>
             <TodoForm loading={false} error={todoError} errorDetails={todoErrorDetails} data={{}} attachFiles={attachTodoFiles} handleSubmit={createTodo} history={history} />
           </Columns>
       </div>

    );
  }
}

export default TodoAdd;
