/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialize, logout } from './actions/auth';
import Wrapper from './component/styles/Wrapper';
import { Header, Footer, Spinner } from './component/Index';
import Routers from './Routes';

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
class Layout extends PureComponent {
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
        <div>
          <Header logout={this.props.logout} user={token ? user : false} />
          <Wrapper>
            <Route
              path="/"
              render={matchProps => (
                <Routers authenticated={!!authenticated} {...matchProps} />
              )}
            />
          </Wrapper>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Layout;

/* Layout.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
}; */
