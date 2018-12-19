import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialize, logout } from '../actions/auth';

import { SignIn, Todo}  from './'
import { Header, Footer }  from '../component'

const AuthRoute = ({ component: Component, ...rest, authenticated, open }) => (
  <Route {...rest} render={props => {
    const from = props.location.pathname;
    if(from  === '/login'){
       return authenticated ? <Redirect to={{  pathname: '/',  state: { from: props.location }}}/> : <Component {...props}/>
    }else{
       return authenticated ? <Component {...props}/> : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
    }
  }}/>
);


@connect(
  state =>{ return {auth: state.auth, app: state.app}},
  dispatch => ( bindActionCreators({
    initialize,
    logout
  }, dispatch))
)
class App extends Component{

    componentWillMount(){
        this.props.initialize();
    }


    render(){
        const {auth: {authenticated, user}, logout } = this.props;
        if(authenticated == null){
            return null
        }

        return (
          <div className="container-fluid">
            <div className="page">
              { authenticated ? <Header logout={logout} user={user} />: null }
              <div className="pageContent">
                <Switch>
                  <AuthRoute path="/login" component={SignIn} authenticated={authenticated} />
                  <AuthRoute exact path="/" component={Todo} authenticated={authenticated} />
                </Switch>
              </div>
              <Footer />
            </div>
          </div>
        );

    }
}

export default App;
