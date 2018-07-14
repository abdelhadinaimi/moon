import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

class AutoCompleteFilter extends React.Component{

  constructor(props){
    super(props);
    this.state = {}
    this.onChange = this.onChange.bind(this);
  }

  onChange(searchText,e,d) {
    const { onDataChange, name } = this.props;
    d.target = { name: name};
    onDataChange(d,searchText);
  }

  render(){
    return (
      <AutoComplete
          name={this.props.name}
          onUpdateInput={this.onChange}
          searchText={this.props.searchText}
          className='autocomplete'
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.props.dataSource || []}
          maxSearchResults={5}
          errorText={this.props.errorText}

        />
    );
  }
}
export default AutoCompleteFilter;
