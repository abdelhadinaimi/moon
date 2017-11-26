import React from 'react';
import {Link} from 'react-router-dom';
import Auth from '../modules/Auth';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import AvatarMenu from './AvatarMenu';

class Base extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <AppBar
          style={{paddingLeft: '30px',paddingRight: '30px'}}
          title={<Link to='/'>MooN</Link>}
          onTitleTouchTap={()=>{  }}
          iconElementRight={Auth.isUserAuthenticated() ? <AvatarMenu user={Auth.getToken()}/> : <LoggedOut />}
          iconElementLeft={<div/>}
        />
        {this.props.child}
      </div>
    );
  }
}
const LoggedOut = () =>(
  <div style={{paddingTop:'5px'}}>
    <Link to="/login"><FlatButton label='Login' style={{color:'white'}}/></Link>
    <Link to="/signup"><FlatButton label='Sign Up' style={{color:'white'}}/></Link>
  </div>
);


export default Base;
