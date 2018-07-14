import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Settings = ({onSubmitEmail,onSubmitPassword,onChange,errors,info,message,success}) => (
  <Card className="container text-center">
      <h2 className="card-heading">Settings</h2>
      { success && message && <p className="success-message text-center">{message}</p>}
      { !success && message && <p className="error-message text-center">{message}</p>}
      <form action="/" onSubmit={onSubmitEmail}>
        <h3 className="card-heading">Change Email</h3>
        <div className="field-line-settings">
          <TextField floatingLabelText="Email" name="email" errorText={errors.email} onChange={onChange} value={info.email}/>
        </div>
        <div className="field-line-settings">
          <TextField floatingLabelText="Password" type="password" name="passwordEmail" errorText={errors.passwordEmail} onChange={onChange} value={info.passwordEmail}/>
        </div>
        <div className="field-line">
          <RaisedButton type="submit" label="Change Email" primary />
        </div>
    </form>
    <hr className="hr-settings"/>
    <form action="/" onSubmit={onSubmitPassword}>
      <h3 className="card-heading">Change Password</h3>
      <div className="field-line-settings">
        <TextField floatingLabelText="Old Password" type="password" name="oldPassword" errorText={errors.oldPassword} onChange={onChange} value={info.oldPassword}/>
      </div>
      <div className="field-line-settings">
        <TextField floatingLabelText="New Password" type="password" name="passwordChange1" errorText={errors.passwordChange1} onChange={onChange} value={info.passwordChange1}/>
      </div>
      <div className="field-line-settings">
        <TextField floatingLabelText="Confirm Password" type="password" name="passwordChange2" errorText={errors.passwordChange2} onChange={onChange} value={info.passwordChange2}/>
      </div>
      <div className="field-line">
        <RaisedButton type="submit" label="Change Password" primary />
      </div>
  </form>
  </Card>
);
export default Settings;
