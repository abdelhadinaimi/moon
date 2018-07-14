import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import GridContainer from '../containers/GridListContainer';


class CategoriesComponent extends React.Component {

  render(){
    const {type} = this.props;
    return(
      <Card>
        <h2 className="card-heading text-center">{type}</h2>
        <GridContainer fetchType="popularAllCat" type={type.substring(0,2).toLocaleLowerCase()} gridListCols={4}/>
      </Card>
    );
  }
  componentWillUpdate(nextProps, nextState){
    location.reload();
  }
}

export default CategoriesComponent;
