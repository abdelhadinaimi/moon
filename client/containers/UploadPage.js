import React from 'react';
import Upload from '../components/forms/Upload';
import * as mime from 'react-native-mime-types';
import { Redirect } from 'react-router-dom';
class UploadPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      errors: {},
      message : '',
      mediaid: '',
      data: {
        file: {},
        thumbnail: {},
        title: '',
        description: '',
        tags: [],
        type: ''
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeData = this.changeData.bind(this);
  }
  changeData(e,v,d){
    if(e.preventDefault)
      e.preventDefault();
    const field = e.target.name;
    const data = this.state.data;
    data[field] = v;
    if(field === 'file'){
      data['type'] = this.getFileExt(v).type;
    }
    this.forceUpdate();
  }
  processForm(event){
    event.preventDefault();
    const validationResult = this.checkForm();
    if(!validationResult.success){
      this.setState({ errors: validationResult.errors});
      return;
    }
    const {file,title,description,tags,thumbnail} = this.state.data;
    let data = new FormData();
    let ntags = tags.map(i => i.label.toLowerCase());
    data.append('title',title);
    data.append('description',description);
    data.append('tags',ntags);
    data.append('type',validationResult.type);
    data.append('ext',validationResult.ext);
    data.append('thumbnail',thumbnail);
    data.append('file',file);
    let request = new Request('/api/upload',{
      method: 'POST',
      body:data
    });
    fetch(request,{credentials: 'include'})
      .then(res => res.json())
      .then(data => {
        if(data.success){
          this.setState({
            mediaid: data.mediaid,
            message: data.message,
            errors: {}
          });
          setTimeout(()=>this.setState({redirect:true}),1000);
        }
        else{
          this.setState({
            message: "",
            errors: data.errors
          });
        }
      });
  }

  checkForm(){
    const {file,thumbnail} = this.state.data;
    let isFormValid = true;
    const errors = {};
    const fileType = this.getFileExt(file);
    if(fileType.type == ''){
      errors.message = "Please choose a valid media file to upload";
      isFormValid =  false;
    }
    console.log(thumbnail);
    if(thumbnail.size && fileType.type !== 'pi' && this.getFileExt(thumbnail).type !== 'pi'){
      errors.message = "Please choose a valid photo for the media";
      isFormValid =  false;
    }
    return {errors,success:isFormValid,type:fileType.type,ext:fileType.ext};
  }
  getFileExt(file){
    const ext = mime.extension(file.type);
    let type = '';
    if(ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'bmp'){
      type = 'pi';
    }
    else if(ext === 'avi' || ext === 'mp4' || ext === 'mov' || ext === 'wmv' || ext === 'flv' || ext === 'webm'){
      type = 'vi';
    }
    else if(ext === 'wav' || ext === 'mp3' || ext === 'ogg' || ext === 'aac'){
      type = 'mu';
    }
    return {type,ext};
  }

  render(){
    return(
      this.state.redirect ? <Redirect to={'/media/'+this.state.mediaid}/> :
      <Upload
        onSubmit={this.processForm}
        onChange={this.changeData}
        errors={this.state.errors}
        data={this.state.data}
        message={this.state.message}
      />
    );
  }
}


export default UploadPage;
