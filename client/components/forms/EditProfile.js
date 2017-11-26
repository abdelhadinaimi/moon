import React from 'react';
import {Card} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const fieldStyle = {
  width : '60%',
  height : '40px'
}

const ProfileInfoItem = ({title,content,name}) => (
  <tr className="profile-info-title">
    <td>
      <b>{title}</b>{" : " }
    </td>
    <td>
    <TextField style={fieldStyle} name={name} defaultValue={content}/>
    </td>
  </tr>

);

const EditProfileForm = ({info,onSubmit,onChange,errors}) => (
  <Card className="container">
    <form action="/">
      <h2 className="card-heading text-center">{info.username}</h2>
      <div className="profile-container">
        <Avatar size={90} style={{marginRight:'16px'}}>{info.username ? info.username[0] : ""}</Avatar>
        <div className="profile-info-section">
          <table width='100%'>
            <tbody>
              <ProfileInfoItem title="Name" name="name" content={info.name + " " + info.surname}/>
              <ProfileInfoItem title="Age" name="age" content={info.age}/>
            </tbody>
          </table>
        </div>
        <div className="profile-info-section">
          <table width='100%'>
            <tbody>
              <ProfileInfoItem title="Country" name="country" content={info.country}/>
              <ProfileInfoItem title="Gender" name="gender" content={info.genderac}/>
            </tbody>
          </table>
        </div>
      </div>
      <div className="button-line text-center">
        <RaisedButton type="submit" label="Save"/>
      </div>
    </form>
  </Card>
);


export default EditProfileForm;
