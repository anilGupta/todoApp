import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialize, logout } from '../actions/auth';
import Wrapper from '../component/styles/Wrapper';
import { Header, Footer, Spinner } from '../component/Index';
import Routers from '../routes';

@connect(
  state => ({ auth: state.auth, app: state.app }),
  dispatch =>
    bindActionCreators(
      {
        initialize,
        logout,
      },
      dispatch,
    ),
)
class App extends PureComponent {
  static defaultProps = {
    auth: {},
  };

  componentWillMount() {
    this.props.initialize();
  }

  render() {
    const {
      auth: { authenticated, token, user = false },
    } = this.props;
    if (authenticated == null) {
      return <Spinner />;
    }

    return (
      <BrowserRouter>
        <Header logout={this.props.logout} user={token ? user : false} />
        <Wrapper>
          <Routers authenticated={authenticated} {...this.props} />
        </Wrapper>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;

App.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
};
