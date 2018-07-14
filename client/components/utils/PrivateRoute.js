import React from 'react';
import Auth from '../../modules/Auth';
import {Route,Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Component,path}) => (
  <Route path={path} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        from: props.location,
        message:'You need to login to view this pages.'
      }}/>
    )
  )}/>
);


export default PrivateRoute;
