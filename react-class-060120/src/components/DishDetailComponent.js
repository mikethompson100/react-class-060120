import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
   Button, Label, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);


class CommentForm  extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isModalOpen: false
      }
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   toggleModal() {
      this.setState({
         isModalOpen: !this.state.isModalOpen
      })
   }

   handleSubmit(values) {
      this.toggleModal();
      this.props.postComment(this.props.dishId, values.rating, values.yourname, values.message);
   }

   render() {
      return (
         <React.Fragment>
            <Button onClick={this.toggleModal} type="button" className="btn btn-outline-secondary">
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
                           <Button type="submit" color="primary" onClick={() => this.toggleModal()}>
                              Submit
                           </Button>
                        </Col>
                     </Row>
                  </LocalForm>
               </ModalBody>
            </Modal>
         </React.Fragment>
      )
	}
}

function RenderDish({ dish }) {
   if (dish != null)
      return (
         <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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

function RenderComments({ comments, postComment, dishId }) {
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
               <CommentForm dishId={dishId} postComment={postComment} />
            </CardBody>
         </Card>
      )
   }
   else return (<div></div>)
}

const DishDetail = (props) => {
   if (props.isLoading) {
      return (
         <div className="container">
            <div className="row">
               <Loading />
            </div>
         </div>
         )
   }
   else if (props.errMess) {
      return (
         <div className="container">
            <div className="row">
               <h4>{props.errMess}</h4>
            </div>
         </div>
      )
   }

   else if (props.dish != null) {
      return (
         <div className="container">
            <div className="row">
               <Breadcrumb>
                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
               </Breadcrumb>
               <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
               </div>
            </div>
            <div className="row">
               <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={props.dish} />
               </div>
               <div className="col-12 col-md-5 m-1">
                  <RenderComments comments={props.comments}
                     postComment={props.postComment}
                     dishId={props.dish.id} />
               </div>
            </div>
         </div>
      );
   }
   else return (<div></div>);
}

export default DishDetail;
