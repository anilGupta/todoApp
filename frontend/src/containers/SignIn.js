import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authenticate, initialize } from '../actions/auth'

@connect(
  	state =>{ return {app: state.app, auth: state.auth}},
  	dispatch => ( bindActionCreators({
    	authenticate,
    	initialize
  	}, dispatch))
)

class SignIn extends Component{

  	constructor(props){
    		super(props);
    		this.state = {
      		username: '',
      		password: '',
			    reset: false,
    		};

    this.toggle = this.toggle.bind(this);
		this.userLogin = this.userLogin.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
  	}

  	componentWillMount(){
     	this.props.initialize();
  	}

  	userLogin (){
    		const { username, password} = this.state;
    		this.props.authenticate({ username, password });
  	}

  	handleSubmit(e){
     	e.preventDefault();
     	this.props.authenticate(this.state)
  	}

  	handleChange(e){
     	const el = e.target;
     	this.setState({
       		[el.name] : el.value
     	})
  	}

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  	render() {
    		const { auth: { error= false } } = this.props,
              { username, password, reset, isOpen} = this.state;
          return (
            <div className="container-fluid">
              <div>
                <form onSubmit={this.handleSubmit}>
                  <h1>Login</h1>
                  { error ? <Alert divor="danger"> { error } </Alert> : null}
                  <div className="form-group">
                    <input className="form-control" id="emailinput" name="username" placeholder="Username" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="passwordinput" name="password" autoComplete="new-password" placeholder="Password" onChange={this.handleChange}/>
                  </div>
                  <button type="submit" className="btn btn-default btn-block btn-main">SIGN IN</button>
                </form>
              </div>
            </div>
          );
  	}
}

export default SignIn;
