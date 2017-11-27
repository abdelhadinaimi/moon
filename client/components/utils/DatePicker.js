import React, { PropTypes } from 'react';
import BaseDatePicker from 'material-ui/DatePicker';

class DatePicker extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.convertToMillis = this.convertToMillis.bind(this);
    this.convertToDateString = this.convertToDateString.bind(this);
  }

  onChange(event, date) {
    const { onDataChange, name } = this.props;
    const e = { target: { name: name}};
    onDataChange(e, date.toISOString());
  }
  convertToMillis(dateString) {
    return dateString.valueOf();
  }
  convertToDateString(dateMillis) {
    if (dateMillis !== null && typeof yourVariable === 'object') {
      return dateMillis;
    }
    return new Date(dateMillis);
  }

  render() {
    const { name,style,textFieldStyle,valueMillis,openToYearSelection,errorText} = this.props;
    const value = this.convertToDateString(valueMillis);
    //console.log(value);
    return(
      <BaseDatePicker
        value={value}
        onChange={this.onChange}
        name={name} // This is required as Material-UI needs a key index on TextField
        style={style}
        textFieldStyle={textFieldStyle}
        openToYearSelection={openToYearSelection}
        errorText={errorText}/>
      )

  }
}


export default DatePicker;
