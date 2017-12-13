import React from 'react';
import SignUpForm from '../components/forms/SignUp.js';
import { Redirect } from 'react-router-dom';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      message : '',
      user: {
        email: '',
        username: '',
        password: '',
        password2: ''
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

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    event.preventDefault(); // prevent default action. in this case, action is the form submission event
    let data = this.state.user;
    let request = new Request('/api/signup',{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });
    fetch(request,{credentials: 'include'})
      .then(res => res.json())// res.json() returns a promise
      .then(data=>{
          console.log("ProcessForm Data",data);
          if(data.success){
            this.setState({
              message: data.message,
              errors: {},
              user: {
                email: '',
                username: '',
                password: '',
                password2: ''
              }
            });
          }
          else{
            this.setState({
              errors : data.errors
            });
          }
      });
  }
  /**
   * Render the component.
   */
  render() {
    return (
        <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
          message={this.state.message}
        />
    );
  }

}

export default SignUpPage;
