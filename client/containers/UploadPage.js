import React from 'react';
import Upload from '../components/forms/Upload';
import * as mime from 'react-native-mime-types';
class UploadPage extends React.Component {

  constructor(props){
    super(props);
    console.log((<input/>));
    this.state = {
      redirect: false,
      errors: {},
      message : '',
      data: {
        file: {},
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
    this.forceUpdate();
  }
  processForm(event){
    event.preventDefault();
    const validationResult = this.checkForm();
    if(!validationResult.success){
      this.setState({ errors: validationResult.errors});
      return;
    }
    const {file,title,description,tags} = this.state.data;
    let data = new FormData();
    let ntags = tags.map(i => i.label);
    data.append('file',file);
    data.append('title',title);
    data.append('description',description);
    data.append('tags',ntags);
    data.append('type',validationResult.type);
    data.append('ext',validationResult.ext);
    let request = new Request('http://localhost:3000/api/upload',{
      method: 'POST',
      body:data
    });
    fetch(request,{credentials: 'include'})
      .then(res => res.json())
      .then(data => {
        if(data.success){
          this.setState({
            message:data.message,
            errors: {}
          });
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
    const {file} = this.state.data;
    let isFormValid = true;
    const errors = {};
    const ext = mime.extension(file.type);
    let type = '';

    if(ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'bmp'){
      type = 'pi';
    }
    else if(ext === 'avi' || ext === 'mp4' || ext === 'mov' || ext === 'wmv' || ext === 'flv' ){
      type = 'vi';
    }
    else if(ext === 'wav' || ext === 'mp3' || ext === 'ogg' || ext === 'aac'){
      type = 'mu';
    }
    else{
      errors.message = "Please choose a valid media file to upload";
      isFormValid =  false;
    }

    return {errors,success:isFormValid,type,ext};
  }

  render(){
    return(
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
