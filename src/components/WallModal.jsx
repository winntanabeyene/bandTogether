import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import Axios from 'axios'


class WallModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      commentValue: '',
      artistComments: [],
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(e) {
    this.setState({ commentValue: e })
  }
  submitComment(event) {
    event.preventDefault();
    const body = {
      comment: this.state.commentValue,
      name: this.props.userProfile.name,
    }
    Axios.post(`/comments/${this.props.currentProfile.id}/${this.props.userProfile.accountId}`, body)
      .then((result) => {
        const rev = result.data.reverse()
        this.setState({
          artistComments: rev,
          commentValue: '',
        })
      })
      .catch((err) => {
        console.log(err)
      })
    console.log('submitted!')
  }





componentDidMount(){
  Axios.get(`/comments/${this.props.currentProfile.id}/${this.props.userProfile.accountId}`)
    .then((result) => {
      const rev = result.data.reverse()
      this.setState({
        artistComments: rev
      })
    })
    .catch((err) => {
      console.log(err);
    })
}


  render() {
    const comments = this.state.artistComments
    console.log(comments)
    return (
      <>
        <Button variant="secondary" onClick={this.handleShow}>
          See {this.props.currentProfile.name}'s Wall!
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.currentProfile.name}'s Wall!</Modal.Title>
          </Modal.Header>
          {comments.map((comment, index) => {
            return (
              <Modal.Body key={index}>
                <div>{comment.name} commented on {moment(comment.createdAt).format('MMMM Do YYYY, h:mm a')}</div>
                <div>{comment.comment}</div>
              </Modal.Body>
            )
          })}
          <Modal.Footer>
            <input placeholder="Add new comment..." required={true}
              onChange={(event) => { this.handleChange(event.target.value) }} value={this.state.commentValue} />
            <Button variant="primary" onClick={(event) => this.submitComment(event)}>Submit Comment</Button>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default WallModal