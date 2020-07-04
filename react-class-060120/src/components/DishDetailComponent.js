import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({myDish}) {
  if (myDish != null)
    return (
      <Card>
        <CardImg top src={myDish.image} alt={myDish.name} />
        <CardBody>
          <CardTitle>{myDish.name}</CardTitle>
          <CardText>{myDish.description}</CardText>
        </CardBody>
      </Card>
    )
  else
    return (
      <div></div>
    );
}

function RenderComments({myDish}) {
  if (myDish != null) {
    return (
      <Card key={myDish.id}>
        <CardBody>
          <h4>Comments</h4>
          {
            myDish.comments.map((element, key) =>
              <CardText key={element.id}>
                {element.comment}<br />
                {element.author}, {new Intl.DateTimeFormat('en-US',
                  { year: 'numeric', month: 'short', day: '2-digit' })
                  .format(new Date(Date.parse(element.date)))}
              </CardText>
            )
          }
        </CardBody>
      </Card>
    )
  }
  else return (<div></div>)
}

const DishDetail = (props) => {
  if (props.myDish != null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish myDish={props.myDish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments myDish={props.myDish} />
          </div>
        </div>
      </div>
    )
  }
  else return (<div></div>);
}

export default DishDetail;
