import React from 'react';
import ProfileComponent from '../components/ProfileComponent';
import { Redirect } from 'react-router-dom';

class ProfilePage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      redirect : false,
      info: {}
    };
    this.getUserInfo(props.match.params.user);
  }

  getUserInfo(username){
    let request = new Request('http://localhost:3000/api/user/'+username,{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'})
    });
    fetch(request)
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
      <ProfileComponent info={this.state.info}/>
    )
  }
}

export default ProfilePage;
