import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

  constructor(props) {
    super(props);
 }

  render() {
    const finalComments = this.props.dishes.map((dish, index) => {
      if (this.props.selectedDish != null)
        return (
          <Card>
            <CardBody>
              <CardText>{dish.comments[index].comment}</CardText>
              <CardText>{dish.comments[index].author}</CardText>
              <CardText>{dish.comments[index].date}</CardText>
            </CardBody>
          </Card>
        )
      else
        return (
          <div></div>
        );
    })
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.props.theDish}
        </div>
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {finalComments}
        </div>
      </div>
    )
  }

}

export default DishDetail;
