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
      info: {},
      errors: {}
    };
    this.getMediaInfo(props.match.params.id);
    this.onLikeHandler = this.onLikeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUpdate(nextProps, nextState){
    if(this.state.info.mediaid != nextProps.match.params.id){
      this.getMediaInfo(nextProps.match.params.id);
      console.log(nextState);
    }
  }
  handleChange(e,v,g){
    const field = e.target.name;
    const info = this.state.info;
    info[field] = v;
    this.forceUpdate();
    console.log(this.state);
  }
  handleSubmit(e){
    e.preventDefault();
    const {comment,mediaid} = this.state.info;
    let request = new Request('/api/media/'+mediaid+'/comment',{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({comment})
    });
    fetch(request,{credentials:'include'})
    .then(req => req.json())
    .then(data => {
      if(data.success){
        this.setState({
          message: data.message,
          errors: {}
        });
      }else{
        this.setState({
          message: "",
          errors: data.errors
        });
        setTimeout(()=>location.reload(),500);
      }
    });
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
        <Route exact path={"/media/"+this.state.info.mediaid+"/"} render={()=>(<MediaComponent
                              info={this.state.info}
                              errors={this.state.errors}
                              onLike={this.onLikeHandler}
                              onChange={this.handleChange}
                              onSubmit={this.handleSubmit}/>)}/>
        <Route path={"/media/"+this.state.info.mediaid+"/edit"} render={()=>(<EditMediaPage info={this.state.info}/>)}/>
      </div>

    )
  }
}


export default MediaPage;
