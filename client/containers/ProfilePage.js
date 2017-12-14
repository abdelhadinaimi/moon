import React from 'react';
import ProfileComponent from '../components/ProfileComponent';
import EditProfilePage from './EditProfilePage';
import ProfileAllMedia from '../components/ProfileAllMedia';
import { Redirect,Route } from 'react-router-dom';
import PrivateRoute from '../components/utils/PrivateRoute';
import Utils from '../modules/Utils';

class ProfilePage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      redirect : false,
      info: {}
    };
    this.getUserInfo(props.match.params.user); //When page is accessed server-side
  }

  /*if the current page's username is not the same as the last page
    This is for when the user is in a profile page and switches to his own profile (client-side)*/
  componentWillUpdate(nextProps, nextState){
    if(this.state.info.username !== nextProps.match.params.user){
      this.getUserInfo(nextProps.match.params.user);
    }
  }

  getUserInfo(username){
    let request = new Request('/api/user/'+username,{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return fetch(request,{credentials: 'include'})
    .then(res=>res.json())
    .then(data =>{
      if(data.error)
        this.setState({redirect : true});
      else{
        this.setState({info:data});
      }
    });
  }
  render(){
    return(
      this.state.redirect ? <Redirect to='/notfound'/> :
      <div>
        <Route exact path={"/profile/"+this.state.info.username+"/"} render={()=>(<ProfileComponent info={this.state.info}/>)}/>
        <Route path={"/profile/"+this.state.info.username+"/edit"} render={()=>(<EditProfilePage info={this.state.info}/>)}/>
        <Route path={"/profile/"+this.state.info.username+"/all"} render={()=>(<ProfileAllMedia info={this.state.info}/>)}/>
      </div>
    )
  }
}

/*
this.state.redirect ? <Redirect to='/notfound'/> :
<ProfileComponent info={this.state.info}/>
*/
export default ProfilePage;
