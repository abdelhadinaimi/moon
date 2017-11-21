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
    let request = new Request('http://localhost:3000/api/logout',{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'})
    });
    fetch(request,{credentials: 'include'});
    Auth.deauthenticateUser();
  }
}


export default LogoutPage;
