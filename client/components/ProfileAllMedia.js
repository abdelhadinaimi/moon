import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import GridContainer from '../containers/GridListContainer';


const ProfileAllMedia = ({info}) => (
  <Card>
    <h2 className="card-heading text-center">{info.username}</h2>
    <CardTitle title="All Uploads"/>
    <GridContainer fetchType="recentAll" user={info.username}/>
  </Card>
);

export default ProfileAllMedia;
