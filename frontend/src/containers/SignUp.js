import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { createUser } from '../actions/auth';
import Columns from '../component/styles/Columns';
import Form from '../component/styles/Form';

@connect(
  state => ({ app: state.app, auth: state.auth }),
  dispatch =>
    bindActionCreators(
      {
        createUser,
      },
      dispatch,
    ),
)
class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createUser(this.state).then(res => {
      if (typeof res === 'boolean') {
        toast('User Created Successfully !! Please Login');
        setTimeout(() => {
          this.props.history.push('/');
        }, 2000);
      } else {
        toast('Invalid details please check !!');
      }
    });
  }

  handleChange(e) {
    const el = e.target;
    this.setState({
      [el.name]: el.value,
    });
  }

  render() {
    const {
      auth: { signupError, signupErrorDetails },
    } = this.props;
    const { email, username, password, confirmPassword } = this.state;
    const isValidPassword =
      password && confirmPassword ? password === confirmPassword : true;
    const isValidForm =
      email && username && password && confirmPassword && isValidPassword;
    const submitProps = isValidForm
      ? {}
      : { disabled: 'disabled', className: 'disabled' };

    return (
      <Columns>
        <Form method="post" onSubmit={this.handleSubmit}>
          <h2 className="center">SIGN UP</h2>
          <fieldset disabled={false} aria-busy={false}>
            {signupError ? (
              <ul className="error">
                {Object.keys(signupErrorDetails).map(err => (
                  <li key={err}>
                    {' '}
                    -- {err} {signupErrorDetails[err]}
                  </li>
                ))}
              </ul>
            ) : null}
            <label htmlFor="email">
              {' '}
              Username
              <input
                type="input"
                name="username"
                placeholder="username"
                value={username}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="email">
              {' '}
              Email
              <input
                type="input"
                name="email"
                placeholder="email"
                value={email}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="password">
              {' '}
              Password
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="confirmPassword">
              {' '}
              Confirm Password
              <input
                className={`${isValidPassword ? '' : 'invalid'}`}
                type="password"
                name="confirmPassword"
                placeholder="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
              />
              {!isValidPassword && (
                <p className="help">password is not matching</p>
              )}
            </label>
            <button type="submit" {...submitProps}>
              Sign Up!
            </button>
          </fieldset>
          <ToastContainer hideProgressBar autoClose={false} />
        </Form>
      </Columns>
    );
  }
}

export default SignUp;

SignUp.propTypes = {
  auth: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
