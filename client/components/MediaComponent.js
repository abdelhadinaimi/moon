import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Player } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";

const MediaComponent = ({info}) => {
    return(
      <Card className="container">
          <h2 className="card-heading text-center">{info.title}</h2>

          <div className="field-line">
            {
              info.type === 'pi' ?
              (<img src={"http://localhost:3000/api/media/"+info.mediaid}></img>) :
              (<Player playsInline src={"http://localhost:3000/api/media/"+info.mediaid} poster={"http://localhost:3000/api/media/"+info.thumbnail}/>)
            }
          </div>
      </Card>
    );
}

export default MediaComponent;
