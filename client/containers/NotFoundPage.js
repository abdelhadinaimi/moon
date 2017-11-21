import React from 'react';
import { Card, CardText } from 'material-ui/Card';


const NotFoundPage = () => (
    <Card className="container">
      <h2 className="card-heading">Page not found !</h2>

      <CardText>Sorry ! There is nothing on this page.</CardText>
    </Card>
);

export default NotFoundPage;
