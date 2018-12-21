import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialize, logout } from '../actions/auth';
import Wrapper from '../component/styles/Wrapper'

import { SignIn, SignUp, Todo, TodoAdd, TodoEdit, TodoArchives }  from './'
import { Header, Footer }  from '../component'

const AuthRoute = ({ component: Component, ...rest, authenticated, open }) => (
  <Route {...rest} render={props => {
    const from = props.location.pathname;
    if(from  === '/login' || from  === '/signup'){
       return authenticated ? <Redirect to={{  pathname: "/",  state: { from: props.location }}}/> : <Component {...props}/>
    }else{
       return authenticated ? <Component {...props}/> : <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>
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
        const {auth: {authenticated, token, user=false}, logout } = this.props;
        if(authenticated == null){
            return null
        }

        return (
          <div>
            <Header logout={logout} user={token ? user: false} />
            <Wrapper>
              <Switch>
                <AuthRoute exact path="/" component={Todo} authenticated={authenticated} />
                <AuthRoute path="/login" component={SignIn} authenticated={authenticated} />
                <AuthRoute path="/signup" component={SignUp} authenticated={authenticated} />
                <AuthRoute path="/todo/add" component={TodoAdd} authenticated={authenticated} />
                <AuthRoute path="/todo/archives" component={TodoArchives} authenticated={authenticated} />
                <AuthRoute path="/todo/:id/edit" component={TodoEdit} authenticated={authenticated} />
              </Switch>
            </Wrapper>
            <Footer />
          </div>
        );

    }
}

export default App;
