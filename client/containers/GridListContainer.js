import React from 'react';
import GridList from '../components/utils/GridList';
import { Link } from 'react-router-dom';

/* TODO
  1- Recent Uploads (user)
  2- Popular Uploads (user)
  3- Popular Uploads (all)
  4- Similar Uploads (media)
*/

const fetchTypes = ['popularAll','recentAll','popularUser','recentUser','similarMedia'];
class GridContainer extends React.Component{

  constructor(props){
    super(props);
    this.state={
      tilesData: [], // {id,title,author}
      fetchURL: '',
    }
    this.getTitlesData();
  }

  getTitlesData(){
    const data = {
      user : this.props.user
    }
    let request = new Request('/api/media/'+this.props.fetchType,{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });
    fetch(request)
    .then(res => res.json())
    .then(data => {
      this.setState({
        tilesData: data
      });
    })
  }

  render(){
    return(
        <GridList tilesData={this.state.tilesData} display={this.props.fetchType}/>
    );
  }
}

export default GridContainer;
