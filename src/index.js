import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import BullsNCows from './components/bulls-n-cows/App';
import Login from './components/Login';
import Home from './components/Home';
import AuthActions from './actions/auth-actions';
import AuthStore from './store/auth-store';

const config = {
  apiKey: "AIzaSyAqOK6Fx6iaf8ksA7Ow4q9jY1stCc5m-NI",
  authDomain: "ajmore-games.firebaseapp.com",
  databaseURL: "https://ajmore-games.firebaseio.com",
  projectId: "ajmore-games",
  storageBucket: "ajmore-games.appspot.com",
  messagingSenderId: "279750385836"
};
firebase.initializeApp(config);
AuthActions.initialize();

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      AuthStore.getState().user ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )
    )} />
  )
};

const App = () => (
  <Router>
    <div>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/bulls-n-cows" component={BullsNCows} />
      <Route path="/login" component={Login} />
      <br />
    </div>
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);