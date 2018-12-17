import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from '../component/Index';


@connect(
  state =>{ return {auth: state.auth, app: state.app}},
  dispatch => ( bindActionCreators({
  }, dispatch))
)
class Home extends Component{

  constructor(props){
     super(props);
  }

  render() {

    return (
	      <div className="container home">
           <h1 className="main-title">Todo Lists</h1>
        </div>
    );
  }
}

export default Home;
