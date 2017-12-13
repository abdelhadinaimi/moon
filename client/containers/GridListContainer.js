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
      console.log(data);
    })
  }

  render(){
    return(
        <GridList tilesData={this.state.tilesData}/>
    );
  }
}
const tilesData = [
  {
    img: 'http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
    id:'64scsdsd'
  },
  {
    img: 'http://www.material-ui.com/images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
    id:'64scsdsdsq'
  },
  {
    img: 'http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
    id:'84scsdsd'
  },
  {
    img: 'http://www.material-ui.com/images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
    id:'64scsds6q'
  },
];


export default GridContainer;
