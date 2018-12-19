import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchTodoListIfNeeded, removeTodo, updateTodo } from '../actions/todo';
import { Spinner, TodoItem } from '../component';


@connect(
  state =>{ return {todo: state.todo }},
  dispatch => ( bindActionCreators({
    fetchTodoListIfNeeded,
    removeTodo,
    updateTodo
  }, dispatch))
)
class Todo extends Component{

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
         return this.props.removeTodo(todo);
       case "archive":
         return this.props.updateTodo(Object.assign({}, todo, { archive: !todo.archive }))
     }
  }

  render() {

    const { todo : { loading, items }} = this.props;

    if(loading){
      return <Spinner />
    }

    return (
	      <div className="container home">
           <h1 className="main-title">Todo Lists</h1>
           {items.map(todo => {
              return <TodoItem {...todo} key={todo.id} handleAction={this.handleAction.bind(this, todo)} />
           })}
        </div>
    );
  }
}

export default Todo;
