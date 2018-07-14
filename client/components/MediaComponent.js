import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Player } from 'video-react';
import IconButton from 'material-ui/IconButton';
import ActionEdit from 'material-ui/svg-icons/image/edit';
import ActionLike from 'material-ui/svg-icons/action/thumb-up';
import {blue500,grey800} from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import "../../node_modules/video-react/dist/video-react.css";
import CommentForm from './forms/CommentForm';
import Comments from './Comments';
import Auth from '../modules/Auth';
const styles = {
  img: {
    width: "100%",
  },
  a: {
      color:"rgb(0, 188, 212)",
  },
}

const MediaComponent = ({info,onLike,onChange,onSubmit,errors}) => {
    return(
      <Card className="container">
          <h2 className="card-heading text-center">{info.title}</h2>
          {info.isOwner &&
            <IconButton className="profile-edit-button" tooltip="Edit Media">
              <Link to={'/media/'+ info.mediaid +'/edit'}>
                <ActionEdit/>
              </Link>
            </IconButton>
          }
          <div className="field-line">
            {
              info.type === 'pi' ?
              (<img src={"/api/media/"+info.mediaid} style={styles.img}/>) :
              (<Player playsInline src={"/api/media/"+info.mediaid} poster={"/api/media/"+info.thumbnail}/>)
            }
            <p>Author : <Link style={styles.a} to={"/profile/"+info.username}>{info.username}</Link></p>
            <p className="profile-likes-number">{info.likes+" Likes"}</p>
            <IconButton className="profile-edit-button" tooltip={info.liked ? "Unlike" : "Like"} style={{top:'-50px'}} onClick={onLike}>
                <ActionLike color={info.liked ? blue500 : grey800}/>
            </IconButton>
          </div>
          <CardTitle title="Description"/>
          <div className="field-line" style={{paddingLeft:"40px"}}>
              {info.description ? info.description : "None"}
          </div>
          <div className="field-line">
              {"Tags : " + (info.tags.length !== 0 ? info.tags.map(i=>i+" ") : "None")}
          </div>
          <CardTitle title="Comments"/>
          {errors && errors.message && <p className="error-message">{errors.message}</p>}
          {Auth.isUserAuthenticated() && <CommentForm onChange={onChange} onSubmit={onSubmit} user={Auth.getToken()} comment={info.comment}/>}
          <hr className="hr-settings"/>
          <Comments info={info.comments}/>
      </Card>
    );
}

export default MediaComponent;
