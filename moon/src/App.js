import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import Home from './components/home';
import SignUpPage from './containers/signUpPage';
import Base from './components/base';

import './styles/App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <div>
            <Base/>
            <Route exact path='/' component={Home}/>
            <Route path='/signup' component={SignUpPage}/>
        </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
