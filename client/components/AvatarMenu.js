import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import MenuItemLink from './MenuItemLink';
import Utils from '../modules/Utils';
class AvatarMenu extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      open : false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event){
    this.setState({open: !this.state.open});
  }
  render(){
    const user = Utils.capitalizeFirstLetter(this.props.user);
    return(
      <IconMenu
        onClick={this.handleClick}
        open={this.state.open}
        onMenuItemFocusChange={(open,reason)=>{if(reason == -1) this.setState({open:false});}}
        onItemTouchTap={this.handleClick}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
        iconButtonElement={
          <Avatar size={50} style={{cursor:'pointer'}}>{user[0]}</Avatar>
      }>
        <MenuItemLink to={'/profile/'+this.props.user} primaryText={user}/>
        <MenuItemLink to='/upload' primaryText="Upload" on/>
        <Divider/>
        <MenuItemLink to='/logout' primaryText="Sign out"/>
      </IconMenu>
    );
  }
}

export default AvatarMenu;
