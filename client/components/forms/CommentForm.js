import React from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ImageLetter from '../utils/ImageLetter';


const CommentForm = ({user,comment,onSubmit,onChange,error}) => {

  return (
    <div>
      <Avatar size={80} style={{marginRight:'16px',marginLeft:'16px'}}>
        <ImageLetter src={"/api/media/profile/"+user} letter={user ? user[0] : ""}/>
      </Avatar>
      <TextField hintText="Comment" style={{width:'70%',top:'-40px'}}
        multiLine={true} rows={2} rowsMax={2} name="comment" onChange={onChange} value={comment}/>
      <RaisedButton type="submit" label="Submit" primary style={{position:'relative',top:'-40px',right:'-20px'}} onClick={onSubmit}/>
    </div>
  );
}

export default CommentForm;
