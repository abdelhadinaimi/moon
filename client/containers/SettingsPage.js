import React from 'react';
import Settings from '../components/forms/Settings';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/Auth';

class SettingsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      errors: {},
      success: true,
      message : '',
      info: {
        email: '',
        passwordEmail: '',
        oldPassword: '',
        passwordChange1: '',
        passwordChange2: '',
      }
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
  }
    onChange(e,v,g){
      const field = e.target.name;
      const info = this.state.info;
      info[field] = v;
      this.forceUpdate();
      console.log(this.state.info);
    }
    submitForm(request){
      fetch(request,{credentials: 'include'})
      .then(req => req.json())
      .then(data => {
        this.setState({
          message: data.message,
          errors: data.success ? {} : (data.errors ? data.errors : {}),
          success: data.success
        }); 
        /*if(data.success){
          this.setState({
            redirect: true,
            message: data.message,
            errors: {}
          });
        }*/
      });
    }
    onSubmitEmail(e){
      e.preventDefault();
      let data = this.state.info;
      let request = new Request('/api//user/'+Auth.getToken()+'/settings/email',{
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
      });
      this.submitForm(request);
    }
    onSubmitPassword(e){
      e.preventDefault();
      let data = this.state.info;
      let request = new Request('/api/user/'+Auth.getToken()+'/settings/password',{
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
      });
      this.submitForm(request);
    }

    render(){
      return(
        <Settings
          info={this.state.info}
          success={this.state.success}
          onChange={this.onChange}
          onSubmitPassword={this.onSubmitPassword}
          onSubmitEmail={this.onSubmitEmail}
          errors={this.state.errors}
          message={this.state.message}/>
      )
    }
}
export default SettingsPage;
