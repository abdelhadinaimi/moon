import React from 'react';
import {BrowserRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home';
import Base from './components/Base';
import SignUpPage from './containers/SignUpPage';
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';
import NotFoundPage from './components/NotFoundPage';
import ProfilePage from './containers/ProfilePage';
import PrivateRoute from './components/utils/PrivateRoute.js';
import EditProfileForm from './components/forms/EditProfile';
import UploadForm from './components/forms/Upload';
import './styles/App.css';

class App extends React.Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Router>
            <div>
              <Base/>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/signup' component={SignUpPage}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/logout' component={LogoutPage}/>
                <Route path='/profile/:user' component={ProfilePage}/>
                <PrivateRoute path='/upload' component={UploadForm}/>
                <Route path='/notfound' component={NotFoundPage}/>
                <Route component={NotFoundPage}/>
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
    );
  }
}


export default App;
