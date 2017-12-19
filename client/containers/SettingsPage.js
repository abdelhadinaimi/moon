import React from 'react';
import Settings from '../components/forms/Settings';
import { Redirect } from 'react-router-dom';


class SettingsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      errors: {},
      message : '',
      info: {
        email: '',
        passwordEmail: '',
        oldPassword: '',
        passwordChange1: '',
        passwordChange2: ''
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
    onSubmitEmail(e){
      e.preventDefault();

    }
    onSubmitPassword(e){
      e.preventDefault();

    }
    render(){
      return(
        <Settings
          info={this.state.info}
          onChange={this.onChange}
          onSubmitPassword={this.onSubmitPassword}
          onSubmitEmail={this.onSubmitEmail}
          errors={this.state.errors}
          message={this.state.message}/>
      )
    }
}
export default SettingsPage;
