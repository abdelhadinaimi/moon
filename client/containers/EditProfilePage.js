import React from 'react';
import EditProfile from '../components/forms/EditProfile';
import Utils from '../modules/Utils';
import { Redirect } from 'react-router-dom';
import * as mime from 'react-native-mime-types';

class EditProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      redirect : !props.info.isOwner,
      info: props.info,
      errors: {},
      message: ""
    };
    if(!this.state.redirect){
      this.getCountries();
    }
    this.onChange = this.onChange.bind(this);
    this.processForm = this.processForm.bind(this);
  }
  onChange(e,v,g){
    const field = e.target.name;
    const info = this.state.info;
    info[field] = v;
    this.forceUpdate();
  }
  processForm(e){
    e.preventDefault(); // prevent default action. in this case, action is the form submission event
    const {birthday,country,gender,name,username,interests,about,photo} = this.state.info;
    //let data = { birthday,country, gender,name,interests,about,photo };
    let data = new FormData();
    if(!photo && this.validatePhoto(photo[0])){
      data.append('photo', photo[0]);
    }
    else{
      const errors = this.state.errors;
      errors.message = "Please choose a valide image";
      this.forceUpdate();
      return;
    }
    data.append('birthday',birthday);
    data.append('country',country);
    data.append('gender',gender);
    data.append('name',name);
    data.append('username',username);
    data.append('interests',interests);
    data.append('about',about);
    let request = new Request('/api/user/'+username+'/edit',{
      method: 'POST',
      body:data
    });
    fetch(request,{credentials: 'include'})
    .then(res => res.json())
    .then(data =>{
      if(data.success){
        this.setState({
          message:data.message,
          errors: {}
        });
        setTimeout(()=>this.setState({redirect:true}),1000);
      }
      else{
        this.setState({
          message: "",
          errors: data.errors
        });
      }
    });
  }
  validatePhoto(photo){
    const type = mime.extension(photo.type)
    return (type == 'png' || type == 'jpg' || type == 'jpeg' || type == 'bmp');
  }
  getCountries(){
    let request = new Request(' /api/countries',{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    fetch(request)
    .then(res=>res.json())
    .then(data => {
      const newInfo = this.state.info;
      newInfo.dataSource = data;
      this.forceUpdate();
    });
  }
  render(){
    return(
      this.state.redirect ? <Redirect to={"/profile/"+this.state.info.username+"/"}/> :
      <EditProfile
        info={this.state.info}
        onChange={this.onChange}
        onSubmit={this.processForm}
        errors={this.state.errors}
        message={this.state.message}/>
    )
  }
}

export default EditProfilePage;
