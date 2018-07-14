import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ActionEdit from 'material-ui/svg-icons/image/edit';
import Utils from '../modules/Utils';
import EditProfile from '../components/forms/EditProfile';
import {Link} from 'react-router-dom';
import ImageLetter from './utils/ImageLetter';
import RaisedButton from 'material-ui/RaisedButton';
import GridContainer from '../containers/GridListContainer';
//259 46
const ProfileInfoItem = ({title,content}) => (
  <tr className="profile-info-title" style={{width:'259px',height:'46px'}}>
    <td>
      <b>{title}</b>{" : " }
    </td>
    <td style={{width: '70%'}}>
    {content}
    </td>
  </tr>
);
//<CardHeader title="URL Avatar" subtitle="Subtitle" avatar={<Avatar src="http://www.material-ui.com/images/uxceo-128.jpg" size={90}/>}/>
const UserComponent = ({info}) => {
    var gender = 'Undefined';
    if(info.gender == 0) gender = "Male";
    else if (info.gender == 1) gender = "Female";
    return(
      <Card className="container">
        <h2 className="card-heading text-center">{info.username}</h2>
        {info.isOwner &&
          <IconButton className="profile-edit-button" tooltip="Edit Profile">
            <Link to={'/profile/'+ info.username +'/edit'}>
              <ActionEdit/>
            </Link>
          </IconButton>
        }
        <div className="profile-container">
          <Avatar size={90} style={{marginRight:'16px'}}>
            <ImageLetter src={"/api/media/profile/"+info.username} letter={info ? info.username[0] : ""}/>
          </Avatar>
          <table className="profile-info-section">
            <tbody>
              <ProfileInfoItem title="Name" content={info.name}/>
              <ProfileInfoItem title="Age" content={Utils.calculateAge(info.birthday)}/>
            </tbody>
          </table>
          <table className="profile-info-section">
            <tbody>
              <ProfileInfoItem title="Country" content={info.country}/>
              <ProfileInfoItem title="Gender" content={gender}/>
            </tbody>
          </table>
          <CardTitle title="About"/>
          <CardText>
            {info.about || "Nothing here yet."}
          </CardText>
          <CardTitle title="Interests"/>
          <CardText>
            {info.interests || "Nothing here yet."}
          </CardText>
        </div>
        <h2 className="card-heading text-center">Recent Uploads</h2>
        <div className="field-line">
          <GridContainer fetchType="recentUser" user={info.username}/>
        </div>
        <div className="button-line text-center">
          <Link to={'/profile/'+ info.username +'/all'}>
            <RaisedButton label="View All" primary/>
          </Link>
        </div>
      </Card>
    )
}


export default UserComponent;
