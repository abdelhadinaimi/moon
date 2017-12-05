import React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/Auth';


class LogoutPage extends React.Component{

  render(){
    this.logout();
    return(
      <Redirect to='/'/>
    )
  }

  logout(){
    Auth.deauthenticateUser();
  }
}


export default LogoutPage;
