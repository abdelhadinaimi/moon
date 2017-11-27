import React from 'react';
import EditProfile from '../components/forms/EditProfile';
import Utils from '../modules/Utils';
import { Redirect } from 'react-router-dom';

class EditProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      redirect : !props.info.isOwner,
      info: props.info,
      errors: {}
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
    console.log(this.state.info);
  }
  processForm(e){
    e.preventDefault(); // prevent default action. in this case, action is the form submission event
    const {birthday,country,gender,name,username} = this.state.info;
    let data = {
      birthday:birthday,
      country:country,
      gender:gender,
      name:name
    };
    let request = new Request('http://localhost:3000/api/user/'+username+'/edit',{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });
    fetch(request,{credentials: 'include'})
    .then(res => res.json())
    .then(data =>{
      if(data.success){
        this.setState({
          errors: {}
        })
      }
      else{
        this.setState({
          errors: data.errors
        })
      }
    });
  }
  getCountries(){
    let request = new Request('http://localhost:3000/api/countries',{
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
        errors={this.state.errors}/>
    )
  }
}

export default EditProfilePage;
