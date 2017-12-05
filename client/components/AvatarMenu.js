import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import MenuItemLink from './MenuItemLink';
import Utils from '../modules/Utils';
import ImageLetter from './utils/ImageLetter';
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
    const user = this.props.user
    return(
      <IconMenu
        onClick={this.handleClick}
        open={this.state.open}
        onMenuItemFocusChange={(open,reason)=>{if(reason == -1) this.setState({open:false});}}
        onItemTouchTap={this.handleClick}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
        iconButtonElement={
        <Avatar size={70} style={{cursor:'pointer',marginBottom:'8px'}}>
          <ImageLetter src={"http://localhost:3000/api/media/profile/"+user} letter={user ? user[0] : ""}/>
        </Avatar>
        }>
        <MenuItemLink to={'/profile/'+user} primaryText={user}/>
        <MenuItemLink to='/upload' primaryText="Upload" on/>
        <Divider/>
        <MenuItemLink to='/logout' primaryText="Sign out"/>
      </IconMenu>
    );
  }
}

export default AvatarMenu;
