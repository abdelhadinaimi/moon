import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';

class MenuItemLink extends React.Component{

  render(){
    return(
      <Link to={this.props.to}><MenuItem primaryText={this.props.primaryText} onClick={this.props.onClick}/></Link>
    )
  }
}

MenuItemLink.muiName = 'MenuItem';

export default MenuItemLink;
