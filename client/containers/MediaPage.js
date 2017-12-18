import React from 'react';
import MediaComponent from '../components/MediaComponent';
import { Redirect,Route } from 'react-router-dom';
import PrivateRoute from '../components/utils/PrivateRoute';
import Utils from '../modules/Utils';
import EditMediaPage from './EditMediaPage';

class MediaPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      redirect : false,
      info: {}
    };
    this.getMediaInfo(props.match.params.id);
    this.onLikeHandler = this.onLikeHandler.bind(this);
  }

  componentWillUpdate(nextProps, nextState){
    if(this.state.info.mediaid != nextProps.match.params.id){
      this.getMediaInfo(nextProps.match.params.id);
    }
  }
  onLikeHandler(e){
    e.preventDefault();
    const {liked,mediaid} = this.state.info;
    let like = liked ? 'unlike' : 'like';
    let request = new Request('/api/media/'+mediaid+'/'+like,{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'})
    });
    fetch(request,{credentials:'include'});
    this.setState(prevState =>  ({
      info: {
        ...prevState.info,
        liked: !liked
      }
    }));
  }
  getMediaInfo(mediaId){
    let request = new Request('/api/media/'+mediaId,{
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
      this.state.redirect || this.state.info.isThumbnail ? <Redirect to='/notfound'/> :
      <div>
        <Route exact path={"/media/"+this.state.info.mediaid+"/"} render={()=>(<MediaComponent info={this.state.info} onLike={this.onLikeHandler}/>)}/>
        <Route path={"/media/"+this.state.info.mediaid+"/edit"} render={()=>(<EditMediaPage info={this.state.info}/>)}/>
      </div>

    )
  }
}


export default MediaPage;
