import React from 'react';
import {Card} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoCompleteFilter from '../utils/AutoCompleteFilter';
import SelectField from '../utils/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from '../utils/DatePicker';

const fieldStyle = {
  width : '80%'
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

const EditProfile = ({info,onSubmit,onChange,errors}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading text-center">{info.username}</h2>
      <div className="profile-container">
        <Avatar size={90} style={{marginRight:'16px'}}>{info.username ? info.username[0] : ""}</Avatar>
        <div className="profile-info-section">
          <table width='100%'>
            <tbody>
              <ProfileInfoItems title="Name">
                <TextField name="name" defaultValue={info.name} style={fieldStyle} onChange={onChange} errorText={errors.name}/>
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
                </SelectField>
              </ProfileInfoItems>
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


export default EditProfile;
