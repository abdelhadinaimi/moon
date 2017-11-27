import React, { PropTypes } from 'react';
import BaseDatePicker from 'material-ui/SelectField';


class SelectField extends React.Component{
  constructor(){
    super();
    this.state={};
    this.onChange = this.onChange.bind(this);
  }
  onChange(event, value) {
    const { onDataChange, name } = this.props;
    const e = { target: { name: name}};
    console.log(event);
    onDataChange(e, value);
  }
  render(){
    const {style,menuStyle,onChange,value,name,errorText} = this.props;
    return(
        <BaseDatePicker style={style} menuStyle={menuStyle} onChange={this.onChange} value={value} errorText={errorText}> 
          {this.props.children}
        </BaseDatePicker>
    )
  }
}


export default SelectField;
