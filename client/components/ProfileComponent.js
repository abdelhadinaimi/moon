import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ActionEdit from 'material-ui/svg-icons/image/edit';
import Utils from '../modules/Utils';
import EditProfile from '../components/forms/EditProfile';
import {Link} from 'react-router-dom';
const ProfileInfoItem = ({title,content}) => (
    <span style={{padding:'10px'}} className="profile-info-title"><b>{title}</b>{" : " + content }<br/></span>
);
//<CardHeader title="URL Avatar" subtitle="Subtitle" avatar={<Avatar src="http://www.material-ui.com/images/uxceo-128.jpg" size={90}/>}/>
const UserComponent = ({info}) => {
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
          <Avatar size={90} style={{marginRight:'16px'}}>{info.username ? info.username[0] : ""}</Avatar>
          <div className="profile-info-section">
            <ProfileInfoItem title="Name" content={info.name + " " + info.surname}/>
            <ProfileInfoItem title="Age" content={info.age}/>
          </div>
          <div className="profile-info-section">
              <ProfileInfoItem title="Country" content={info.country}/>
              <ProfileInfoItem title="Gender" content={info.gender}/>
          </div>
        </div>
      </Card>
    )
}


export default UserComponent;
