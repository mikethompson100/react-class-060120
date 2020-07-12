import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
   Button, Label, Col, Row,
   Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class DishDetail extends Component {
   constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.state = {
         isModalOpen: false
      }
   }

   toggleModal() {
      this.setState({
         isModalOpen: !this.state.isModalOpen
      })
   }
   handleSubmit(values) {
      console.log('Current State is: ' + JSON.stringify(values));
      alert('Current State is: ' + JSON.stringify(values));
      this.toggleModal(); // Closes modal after alert
   }
   
   renderDish(dish) {
   if (dish != null)
      return (
         <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
               <CardTitle>{dish.name}</CardTitle>
               <CardText>{dish.description}</CardText>
            </CardBody>
         </Card>
      )
   else
      return (
         <div></div>
      );
   }

   commentForm() {
   return (
      <React.Fragment>
         <Button onClick={() => this.toggleModal()} type="button" className="btn btn-outline-secondary">
            <span className="fa fa-pencil"></span> Submit Comment
         </Button>

         <Modal toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
               <Label htmlFor="rating" md={12}>Rating</Label>
              <Col md={12}>
                  <Control.select model=".rating" name="rating"
                     className="form-control">
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                  </Control.select>
               </Col>
            </Row>
            <Row className="form-group">
               <Label htmlFor="yourname" md={12}>Your Name</Label>
               <Col md={12}>
                  <Control.text model=".yourname" id="yourname" name="yourname"
                     placeholder="Your Name"
                     className="form-control"
                     validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                           }} />
                  <Errors
                     className="text-danger"
                     model=".yourname"
                     show="touched"
                     messages={{
                        required: 'Required. ',
                        minLength: 'Must be greater than two characters. ',
                        maxLength: 'Must be 15 characters or less. '
                     }}
                  />
               </Col>
            </Row>
            <Row className="form-group">
               <Label htmlFor="message" md={12}>Comment</Label>
               <Col md={12}>
                  <Control.textarea model=".message" id="message" name="message"
                     rows="6"
                     className="form-control" />
               </Col>
            </Row>
            <Row className="form-group">
               <Col md={10}>
                  <Button type="submit" color="primary">
                     Submit
                  </Button>
               </Col>
            </Row>
               </LocalForm>
            </ModalBody>
         </Modal>
      </React.Fragment>
   )
};

   renderComments(comments) {
      if (comments != null) {
         return (
            <Card>
               <CardBody>
                  <h4>Comments</h4>
                  <ul className="list-unstyled">
                     {comments.map((comment) => {
                        return (
                           <li key={comment.id}>
                              <p>{comment.comment}</p>
                              <p>-- {comment.author}</p>, {new Intl.DateTimeFormat('en-US',
                                 { year: 'numeric', month: 'short', day: '2-digit' })
                                 .format(new Date(Date.parse(comment.date)))
                              }
                           </li>)
                     }
                     )
                     }
                  </ul>
                  {this.commentForm()}
               </CardBody>
            </Card>
         )
      }
      else return (<div></div>)
   }

   render() {
      if (this.props.dish != null) {
         return (
            <div className="container">
               <div className="row">
                  <Breadcrumb>
                     <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                     <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="col-12">
                     <h3>{this.props.dish.name}</h3>
                     <hr />
                  </div>
               </div>
               <div className="row">
                  <div className="col-12 col-md-5 m-1">
                     {this.renderDish(this.props.dish)}
                  </div>
                  <div className="col-12 col-md-5 m-1">
                     {this.renderComments(this.props.comments)} 
                  </div>
               </div>
            </div>
         );
     }
     else return (<div></div>);
}

}
export default DishDetail;
