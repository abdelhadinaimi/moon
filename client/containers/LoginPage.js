import React from 'react';
import LoginForm from '../components/forms/Login.js';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/Auth';
class LoginPage extends React.Component {

  constructor(props){
    super(props);
    console.log(props);
    const location = props.location;
    this.state = {
      redirect: false,
      to : location.from || '/' ,
      errors: { message : location.message},
      message : '',
      user: {
        email: '',
        password: ''
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  processForm(event){
    event.preventDefault(); // prevent default action. in this case, action is the form submission event
    let data = this.state.user;
    let request = new Request('/api/login',{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });
    fetch(request,{credentials: 'include'})
      .then(res => res.json())// res.json() returns a promise
      .then(data=>{
          console.log("ProcessForm Data",data);
          if(data.success){
            Auth.authenticateUser(data.token);
            this.setState({
              redirect: true,
              errors: {}
            });
          }
          else{
            this.setState({
              errors : data.errors
            });
          }
      });
  }

  render(){
    return (
      this.state.redirect ?  <Redirect to={this.state.to}/> :
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />
    );
  }
}

export default LoginPage;
