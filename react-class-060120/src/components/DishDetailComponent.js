import React, { Component } from 'react';
import { Card, CardText, CardBody } from 'reactstrap';

class DishDetail extends Component {

  render() {
    const showComments = () => {
      var myDish = this.props.myDish;
      if (myDish != null) {        
        return (
          <Card key={myDish.id}>
          <h4>Comments</h4>
            {
              this.items = myDish.comments.map((element, key) =>
                <CardBody key={element.id}>
                  <CardText>
                    {element.comment}<br />
                    {element.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(element.date)))}
                  </CardText>
                </CardBody>
              )
						}
        </Card>
        )
      }
      else return (<div></div>)
    }
    return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.props.theDish}
        </div>
        <div className="col-12 col-md-5 m-1">          
            {showComments()}
        </div>
        </div>
      </div>
    )
  }

}

export default DishDetail;
