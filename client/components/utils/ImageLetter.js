import React from 'react';


const imgStyle = {
  height:'100%',
  width: '100%',
  borderRadius: '50%'
}

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error : false };
    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    this.setState({ error : true });
  }

  render() {
    const {src,letter} = this.props;
    return (
      this.state.error ? <p>{letter}</p> : <img src={src} onError={this.handleError} style={imgStyle}/>
    );
  }
}
export default Image;
