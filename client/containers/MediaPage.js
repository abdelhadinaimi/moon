import React from 'react';
import MediaComponent from '../components/MediaComponent';
import { Redirect,Route } from 'react-router-dom';
import PrivateRoute from '../components/utils/PrivateRoute';
import Utils from '../modules/Utils';

class MediaPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      redirect : false,
      info: {}
    };
    this.getMediaInfo(props.match.params.id);
  }

  componentWillUpdate(nextProps, nextState){
    if(this.state.info.mediaid != nextProps.match.params.id){
      this.getMediaInfo(nextProps.match.params.id);
    }
  }
  getMediaInfo(mediaId){
    let request = new Request('http://localhost:3000/api/media/'+mediaId,{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'})
    });
    fetch(request,{credentials: 'include'})
    .then(res=>res.json())
    .then(data =>{
      if(data.error)
        this.setState({redirect:true});
      else{
        this.setState({info:data});
      }
    });
  }

  render(){
    return(
      this.state.redirect ? <Redirect to='/notfound'/> :
        <Route path={"/media/"+this.state.info.mediaid+"/"} render={()=>(<MediaComponent info={this.state.info}/>)}/>

    )
  }
}


export default MediaPage;
