import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      <div className="field-line">
        <TextField hintText="Username" name="username" onChange={onChange} value={user.username} errorText={errors.username}/>
      </div>

      <div className="field-line">
        <TextField hintText="E-mail" name="email" onChange={onChange} value={user.email} errorText={errors.email}/>
      </div>

      <div className="field-line">
        <TextField hintText="Password" name="password" type="password" onChange={onChange} value={user.password} errorText={errors.password}/>
      </div>

      <div className="field-line">
        <TextField hintText="Renter your password" name="password2" type="password" onChange={onChange} value={user.password2} errorText={errors.password2}/>
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create New Account"/>
      </div>

      <CardText>Already have an account? <Link to='/login'>Log in</Link></CardText>
    </form>
  </Card>
);


export default SignUpForm;
