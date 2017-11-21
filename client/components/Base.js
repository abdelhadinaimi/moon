import React from 'react';
import {Link} from 'react-router-dom';
import Auth from '../modules/Auth';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
class Base extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <AppBar
          title={<Link to='/'>MooN</Link>}
          onTitleTouchTap={()=>{  }}
          iconElementRight={Auth.isUserAuthenticated() ? <LoggedIn /> : <LoggedOut />}
          iconElementLeft={<div/>}
        />
        {this.props.child}
      </div>
    );
  }
}
const LoggedOut = () =>(
  <div>
    <Link to="/login"><FlatButton label='Login'/></Link>
    <Link to="/signup"><FlatButton label='Sign Up'/></Link>
  </div>
);
const LoggedIn = () => (
    <IconMenu iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
  }>
      <Link to="/upload"><MenuItem primaryText="Upload"/></Link>
      <MenuItem primaryText="Help"/>
      <Link to="/logout"><MenuItem primaryText="Sign out"/></Link>
    </IconMenu>
);

export default Base;
