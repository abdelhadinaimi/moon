import React from 'react';
import EditProfile from '../components/forms/EditProfile';
import Utils from '../modules/Utils';
import { Redirect } from 'react-router-dom';

class EditProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      redirect : !props.info.isOwner,
      info: props.info
    };
  }

  render(){
    return(
      this.state.redirect ? <Redirect to={"/profile/"+this.state.info.username+"/"}/> :
      <EditProfile info={this.state.info}/>
    )
  }
}

export default EditProfilePage;
