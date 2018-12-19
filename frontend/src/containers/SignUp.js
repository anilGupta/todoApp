import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createUser } from '../actions/auth'
import Columns from '../component/styles/Columns';
import Form from '../component/styles/Form';


@connect(
  	state =>{ return {app: state.app, auth: state.auth}},
  	dispatch => ( bindActionCreators({
    	createUser,
  	}, dispatch))
)

class SignUp extends Component{

  	constructor(props){
    		super(props);
    		this.state = {
      		username: '',
          email: '',
      		password: '',
          confirmPassword: ''
    		};

    this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
  	}

  	componentWillMount(){
     	 //this.props.initialize();
  	}



  	handleSubmit(e){
     	e.preventDefault();
     	this.props.createUser(this.state)
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
    		const { auth: { signupError, signupErrorDetails } } = this.props,
              { email, username, password, confirmPassword } = this.state;

    		        console.log(signupError, signupErrorDetails);


          return (
              <Columns>
                <Form method="post" onSubmit={this.handleSubmit}>
                  <h2>SIGN UP FOR ACCOUNT</h2>
                  <fieldset disabled={false} aria-busy={false}>
                   { signupError
                      ? <ul className="error">
                        {Object.keys(signupErrorDetails).map((err, key) => {
                           return <li key={key}>{err} {signupErrorDetails[err]}</li>
                        })}
                        </ul> : null}
                    <label htmlFor="email"> Username
                      <input type="input" name="username" placeholder="username" value={username} onChange={this.handleChange} />
                    </label>

                    <label htmlFor="email"> Email
                      <input type="input" name="email" placeholder="email" value={email} onChange={this.handleChange} />
                    </label>

                    <label htmlFor="password"> Password
                      <input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
                    </label>

                    <label htmlFor="confirmPassword"> Confirm Password
                      <input type="password" name="confirmPassword" placeholder="confirmPassword" value={confirmPassword} onChange={this.handleChange} />
                    </label>
                    <button type="submit">Sign Up!</button>
                  </fieldset>
                </Form>
              </Columns>
          );
  	}
}

export default SignUp;
