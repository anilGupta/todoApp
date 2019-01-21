/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authenticate, initialize } from '../actions/auth';
import Columns from '../component/styles/Columns';
import Form from '../component/styles/Form';

@connect(
  state => ({ app: state.app, auth: state.auth }),
  dispatch =>
    bindActionCreators(
      {
        authenticate,
        initialize,
      },
      dispatch,
    ),
)
class SignIn extends PureComponent {
  constructor(props) {
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

  componentDidMount() {
    this.props.initialize();
  }

  userLogin() {
    const { username, password } = this.state;
    this.props.authenticate({ username, password });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authenticate(this.state);
  }

  handleChange(e) {
    const el = e.target;
    this.setState({
      [el.name]: el.value,
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const {
      auth: { error = false },
    } = this.props;
    const { username, password } = this.state;
    return (
      <Columns>
        <Form method="post" onSubmit={this.handleSubmit}>
          <h2 className="center">SIGN IN</h2>
          <fieldset disabled={false} aria-busy={false}>
            {error ? <div className="error"> {error} </div> : null}
            <label htmlFor="email">
              {' '}
              Username/Email
              <input
                type="input"
                name="username"
                placeholder="email"
                value={username}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={this.handleChange}
              />
            </label>
            <button type="submit">Sign In!</button>
          </fieldset>
        </Form>
      </Columns>
    );
  }
}

export default SignIn;
