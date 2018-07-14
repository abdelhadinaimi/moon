import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText,CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import GridContainer from '../containers/GridListContainer';
const Home = () => (
  <Card className="container text-center">
    <h1>Most Popular</h1>

    <CardTitle title="Videos"/>
    <GridContainer fetchType="popularAll" type="vi"/>
    <CardTitle title="Pictures"/>
    <GridContainer fetchType="popularAll" type="pi"/>
    <CardTitle title="Music"/>
    <GridContainer fetchType="popularAll" type="mu"/>
  </Card>
);



export default Home;
