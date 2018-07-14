import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import GridContainer from '../containers/GridListContainer';


class SearchComponent extends React.Component {

  render(){
    console.log(this.props.match.params.tag);
    const tag = this.props.match.params.tag;
    return(
      <Card>
        <h2 className="card-heading text-center">{"Search result for " + tag}</h2>
        <GridContainer fetchType="searchMedia" type={tag}/>
      </Card>
    );
  }
  componentWillUpdate(nextProps, nextState){
    location.reload();
  }
}

export default SearchComponent;
