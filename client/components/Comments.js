import React from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ImageLetter from './utils/ImageLetter';
import { Link } from 'react-router-dom';

const Comments = ({info}) => {
  return(info ? info.map(i => <Comment info={i} key={i.commentid}/>) : <p style={{textAlign:"center"}}>None</p> );
}


const Comment = ({info}) => (
  <table style={{padding:"10px 0"}}>
    <tbody>
      <tr>
        <td style={{textAlign:'center',fontWeight:'500'}}>
          <Link to={"/profile/"+info.username} style={{color:"black",}}>
            {info.username}
          </Link>
        </td>
        <td rowSpan={2}>
          <div>{info.comment}</div>
        </td>
      </tr>
      <tr>
        <td>
          <Link to={"/profile/"+info.username}>
            <Avatar size={80} style={{margin:'10px 16px',float:'left'}}>
              <ImageLetter src={"/api/media/profile/"+info.username} letter={info ? info.username[0] : ""}/>
            </Avatar>
          </Link>
        </td>
      </tr>
    </tbody>
  </table>
)

export default Comments;
