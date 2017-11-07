import React, { PropTypes } from 'react';
import SignUpForm from '../components/signUpForm.js';


class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
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
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    let data = this.state.user;
    let request = new Request('http://localhost:3000/api/signup',{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });
    fetch(request)
      .then(res => {
          let json = res.json();
          console.log(json);
          return json;
      })
      .then(data=>{
          this.setState({
            errors: data.errors
          });
        return;
      });

      // .then((res)=>{
      //   request.json()
      //     .then((data)=>{
      //       console.log(data);
      //     });
      //   })
      // .catch((err)=>{
      //   console.log(err);
      // })
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
      />
    );
  }

}

export default SignUpPage;
