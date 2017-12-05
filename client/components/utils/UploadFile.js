import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class UploadFile extends React.Component {

  constructor(props){
    super(props);
    this.state={
      file : {},
      filename: ''
    }
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(event){
    const file = event.target.files[0];
    let displayName = '';
    if(file){
      displayName = file.name;
      if(displayName.length > 25)
        displayName = displayName.substring(0,25)+"...";
    }
    file.displayName = displayName;

    this.props.onChange(event,file);
  }

  render(){
    const {displayName} = this.props.value;
    return(
      <RaisedButton
        //,wordWrap: 'break-word'
        style={{width:'256px',zIndex:'99999',textAlign:'center'}}
        containerElement='label'
        label={displayName ? displayName : 'Choose A file' }>
        <input
          name={this.props.name}
          type="file"
          style={{ display: 'none' }}
          onChange={this.handleFile}/>
      </RaisedButton>
    )
  }
}


export default UploadFile;
