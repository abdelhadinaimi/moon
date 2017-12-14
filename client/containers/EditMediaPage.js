import React from 'react';
import EditMedia from '../components/forms/EditMedia';
import { Redirect } from 'react-router-dom';
class EditMediaPage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      redirect : !props.info.isOwner,
      info: props.info,
      errors: {},
      message: "",
      infoOld: props.info
    };
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
    /* TODO
      1- compare old and new tags to check what to delete and what to add.
      2-
    */
  }
  render(){
    return(
      this.state.redirect ? <Redirect to={"/media/"+this.state.info.mediaid+"/"}/> :
      <EditMedia
        info={this.state.info}
        onChange={this.onChange}
        onSubmit={this.processForm}
        errors={this.state.errors}
        message={this.state.message}/>
    )
  }
}


export default EditMediaPage;
