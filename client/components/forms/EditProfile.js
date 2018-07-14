import React from 'react';
import {Card,CardTitle} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoCompleteFilter from '../utils/AutoCompleteFilter';
import SelectField from '../utils/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from '../utils/DatePicker';
import IconButton from 'material-ui/IconButton';
import ImageLetter from '../utils/ImageLetter';
const fieldStyle = {
  width : '80%'
}
const uploadInput = {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
}

class ProfileInfoItems extends React.Component {

  render(){
    return(
      <tr className="profile-info-title">
        <td className='profile-td'>
          <b>{this.props.title}</b>{" : " }
        </td>
        <td style={{width: '75%'}} >
          {this.props.children}
        </td>
      </tr>
    )
  }
}
//<input type="file" style={uploadInput} name="photo" onChange={onChange}/>
const EditProfile = ({info,onSubmit,onChange,errors,message}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading text-center">{info.username}</h2>
      <div className="profile-container">
        { message && <p className="success-message text-center">{message}</p>}
        {errors.message && <p className="error-message text-center">{errors.message}</p>}
      <IconButton style={{width:'114px',height:'114px'}} tooltip="Change you photo" tooltipPosition="top-right">
        <Avatar size={90} style={{marginRight:'16px',cursor:'pointer'}}>
          <ImageLetter src={"/api/media/profile/"+info.username} letter={info ? info.username[0] : ""}/>
          <input type="file" style={uploadInput} name="photo" onChange={(e)=>onChange(e,e.target.files)}/>
        </Avatar>
      </IconButton>
        <div className="profile-info-section">
          <table width='100%'>
            <tbody>
              <ProfileInfoItems title="Name">
                <TextField name="name" value={info.name} style={fieldStyle} onChange={onChange} errorText={errors.name}/>
              </ProfileInfoItems>
              <ProfileInfoItems title="Birthdate">
                <DatePicker name="birthday" openToYearSelection={true}
                    style={fieldStyle}
                    textFieldStyle={{width:'100%'}}
                    onDataChange={onChange}
                    valueMillis={info.birthday}
                    errorText={errors.birthday}/>
              </ProfileInfoItems>
            </tbody>
          </table>
        </div>
        <div className="profile-info-section">
          <table width='100%'>
            <tbody>
              <ProfileInfoItems title="Country">
                <AutoCompleteFilter name="country" searchText={info.country} dataSource={info.dataSource} onDataChange={onChange} errorText={errors.country}/>
              </ProfileInfoItems>
              <ProfileInfoItems title="Gender">
                <SelectField style={fieldStyle} onDataChange={onChange} value={info.gender} name="gender" errorText={errors.gender}>
                  <MenuItem value={0} primaryText="Male"/>
                  <MenuItem value={1} primaryText="Female"/>
                  <MenuItem value={2} primaryText="Undefined"/>
                </SelectField>
              </ProfileInfoItems>
            </tbody>
          </table>
        </div>
        <CardTitle title="About"/>
        <TextField hintText="Write something about yourself."
           multiLine={true} rows={1} rowsMax={4} fullWidth={true} name="about" value={info.about} onChange={onChange}/>
        <CardTitle title="Interests"/>
        <TextField hintText="Tell us what you like."
          multiLine={true} rows={1} rowsMax={4} fullWidth={true} name="interests" value={info.interests} onChange={onChange}/>
      </div>
      <div className="button-line text-center">
        <RaisedButton type="submit" label="Save"/>
      </div>
    </form>
  </Card>
);

export default EditProfile;
