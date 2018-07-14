import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import Auth from '../modules/Auth';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import AvatarMenu from './AvatarMenu';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';

class Base extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      redirect : false,
      query : '',
    };
    this.redirect = this.redirect.bind(this);
  }
  redirect(query){
    this.setState({
      redirect : true,
      query : query
    });
  }
  render(){
    return(
      <div>
        <AppBar
          style={{paddingLeft: '30px',paddingRight: '30px',height:'85px'}}
          title={<Link to='/' style={{color:'#fff'}}>MooN</Link>}
          titleStyle={{paddingTop:'8px'}}
          onTitleTouchTap={()=>{  }}
          iconElementRight={Auth.isUserAuthenticated() ? <AvatarMenu user={Auth.getToken()}/> : <LoggedOut />}
          iconElementLeft={<MidBar onSubmit={this.redirect}/>}
          iconStyleLeft={{position:'absolute',marginLeft:'10%',marginTop:'23px'}}
        />
        {this.state.redirect ? <Redirect to={'/search/'+this.state.query}/> : this.props.child}
      </div>
    );
  }
}

class MidBar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value : ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSearchClick(e){
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  }
  handleChange(e){
    this.setState({
      value : e.target.value
    })
  }
  handleClick(e){
    e.preventDefault();

    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  };

  handleRequestClose(){
    this.setState({
      open: false,
    });
  };

  render(){
    return(
      <div style={{position:'relative',top:'-6px',width:'700px'}}>
        <FlatButton onClick={this.handleClick} label="Categories" style={{color:"white"}}/>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{"horizontal":"left","vertical":"bottom"}}
          targetOrigin={{"horizontal":"left","vertical":"top"}}>
          <Paper>
            <Menu>
              <Link to='/categorie/videos'><MenuItem primaryText="Videos" onClick={this.handleRequestClose}/></Link>
              <Link to='/categorie/pictures'><MenuItem primaryText="Pictures" onClick={this.handleRequestClose}/></Link>
              <Link to='/categorie/music'><MenuItem primaryText="Music" onClick={this.handleRequestClose}/></Link>
            </Menu>
          </Paper>
        </Popover>
        <SearchForm onSubmit={this.handleSearchClick} onChange={this.handleChange}/>
      </div>
    );
  }
}

const SearchForm = ({onSubmit,onChange}) => (
  <div style={{position: 'relative', display: 'inline-block',paddingLeft:'16%'}}>
    <form onSubmit={onSubmit}>
      <IconButton style={{float:'right'}} onClick={onSubmit}>
        <ActionSearch style={{color:'white'}}/>
      </IconButton>
      <TextField name="search" hintText="Search by Tag" style={{width:'400px'}} onChange={onChange}/>
    </form>
  </div>
);

const LoggedOut = () =>(
  <div style={{paddingTop:'15px'}}>
    <Link to="/login"><FlatButton label='Login' style={{color:'white'}}/></Link>
    <Link to="/signup"><FlatButton label='Sign Up' style={{color:'white'}}/></Link>
  </div>
);


export default Base;
