import React from 'react';
import EditMedia from '../components/forms/EditMedia';
import { Redirect } from 'react-router-dom';
import Utils from '../modules/Utils';
class EditMediaPage extends React.Component{

  constructor(props){
    super(props);
    let tags = props.info.tags.map(i=> ({label:i}));
    Object.assign(props.info,{tags:tags});
    const stringInfo = JSON.stringify(props.info);
    const oldInfo = JSON.parse(stringInfo);// deep clone props.info
    const info =  JSON.parse(stringInfo);
    this.state={
      redirect : !props.info.isOwner,
      info: info,
      errors: {},
      message: "",
      infoOld: oldInfo
    };
    console.log("constructor");
    this.onChange = this.onChange.bind(this);
    this.processForm = this.processForm.bind(this);
  }
  onChange(e,v,g){
    const field = e.target.name;
    const info = this.state.info;
    info[field] = v;
    this.forceUpdate();
  }

  processForm(e){
    e.preventDefault();
    const validationResult = this.checkForm();
    if(!validationResult.success){
      this.setState({ errors: validationResult.errors});
      return;
    }
    const {title,description,tags,thumbnail,mediaid,type,username} = this.state.info;
    const {tags:oldTags,thumbnail:thumbnailID} = this.state.infoOld;
    let data = new FormData();
    data.append('title',title);
    data.append('description',description);
    data.append('tags',JSON.stringify(processTags(oldTags,tags)));
    data.append('thumbnailID',thumbnailID);
    data.append('thumbnail',thumbnail);
    data.append('mediaid',mediaid);
    data.append('type',type);
    data.append('username',username);

    let request = new Request('/api/media/'+mediaid+'/edit',{
      method: 'POST',
      body:data
    });
    fetch(request,{credentials: 'include'})
      .then(res => res.json())
      .then(data => {
        if(data.success){
          this.setState({
            message: data.message,
            errors: {}
          });
          setTimeout(()=>{
            window.location.reload();
            this.setState({redirect:true});
            },1000);
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
    const {type,thumbnail} = this.state.info;
    let isFormValid = true;
    const errors = {};
    if(typeof thumbnail !== 'string' && type !== 'pi' && this.getFileExt(thumbnail).type !== 'pi'){
      errors.message = "Please choose a valid photo for the media";
      isFormValid =  false;
    }
    return {errors,success:isFormValid};
  }
  getFileExt(file){
    return Utils.getFileExt(file);
  }
  render(){
    return(
      this.state.redirect ? <Redirect to={"/media/"+this.state.info.mediaid+"/"}/>  :
      <EditMedia
        info={this.state.info}
        onChange={this.onChange}
        onSubmit={this.processForm}
        errors={this.state.errors}
        message={this.state.message}/>
      )
    }
}

const processTags = (old,ne) => {
  function remove(array, element) {
       return array.filter(e => e.label !== element.label);
  }
  let res = old.map(i=>{
    for(let j = 0; j < ne.length; j++){
      if(i.label === ne[j].label){
        ne = remove(ne,ne[j]);
        return {...i,status:"none"}
        }
      }
    return {...i,status:"remove"}
  });
  ne = ne.map(i=> ({...i,status:"add"}));
  return res.concat(ne);
}

export default EditMediaPage;
