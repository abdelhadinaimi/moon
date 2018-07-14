import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import UploadFile from '../utils/UploadFile';
import RaisedButton from 'material-ui/RaisedButton';
import Tags from '../utils/Tags';

const containerStyle={
  padding:'0 30px',
  display:"flex",
  flexDirection: "row",
  flexWrap: "wrap"
};

const EditMedia = ({onSubmit,onChange,errors,info,message}) =>{
  return(
    <Card className="container text-center">
      <form action="/" onSubmit={onSubmit}>
        <h2 className="card-heading text-center">Edit Media</h2>
        {message && <p className="success-message">{message}</p>}
        {errors.message && <p className="error-message">{errors.message}</p>}

        <div className="field-line">
          <TextField floatingLabelText="Title" name="title" errorText={errors.title} onChange={onChange} value={info.title}/>
        </div>

        {
          (info.type === 'mu' || info.type === 'vi') && <div className="field-line">
            <UploadFile onChange={onChange} name="thumbnail" label='Choose A thumbnail' errorText={errors.thumbnail} value={info.thumbnail}/>
          </div>
        }

        <div className="field-line">
          <TextField hintText="Description" style={{width:'384px'}}
            multiLine={true} rows={1} rowsMax={4} name="description" errorText={errors.description} value={info.description} onChange={onChange}/>
        </div>
        <div className="field-line">
          <Tags
            defTags={info.tags}
            onAdd={onChange}
            onRemove={onChange}
            errorText={errors.tags}
            name="tags"
            style={{width:'40%',bottom:'10px'}}
            containerStyle={containerStyle}
            button={<RaisedButton style={{color:'red'}} label="hello" type="submit"/>}
            textField={<TextField floatingLabelText="Tags"/>}
          />
        </div>
        <div className="button-line">
          <RaisedButton type="submit" label="Submit" primary/>
        </div>
      </form>
    </Card>
  )
}



export default EditMedia;
