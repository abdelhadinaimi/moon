import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Player } from 'video-react';
import { Link } from 'react-router-dom';
import "../../node_modules/video-react/dist/video-react.css";



const styles = {
  img: {
    width: "100%",
  },
  a: {
      color:"rgb(0, 188, 212)",
  },
}

const MediaComponent = ({info}) => {
    return(
      <Card className="container">
          <h2 className="card-heading text-center">{info.title}</h2>

          <div className="field-line">
            {
              info.type === 'pi' ?
              (<img src={"/api/media/"+info.mediaid} style={styles.img}/>) :
              (<Player playsInline src={"/api/media/"+info.mediaid} poster={"/api/media/"+info.thumbnail}/>)
            }
            <p>Author : <Link style={styles.a} to={"/profile/"+info.username}>{info.username}</Link></p>
          </div>
          <CardTitle title="Description"/>
          <div className="field-line" style={{paddingLeft:"40px"}}>
              {info.description ? info.description : "None"}
          </div>
          <div className="field-line">
              {"Tags : " + (info.tags.length !== 0 ? info.tags.map(i=>i+" ") : "None")}
          </div>
      </Card>
    );
}

export default MediaComponent;
