import React from 'react';
import ListView from './ListView';
import Axios from 'axios';
import moment from 'moment';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      commentValue: '',
      artistComments: [],
    }
  }
  handleChange(e){
    console.log(e)
    this.setState({commentValue: e})
  }
  submitComment(event){
    event.preventDefault();
    const body = {
      comment: this.state.commentValue,
      name: this.props.userProfile.name,
    }
    Axios.post(`/comments/${this.props.currentProfile.id}/${this.props.userProfile.accountId}`, body)
    .then((result)=>{
      const rev = result.data.reverse()
      this.setState({
        artistComments: rev,
        commentValue: '',
      })
    })
    .catch((err)=>{
      console.log(err)
    })
    console.log('submitted!')
  }

  componentDidMount(){
    Axios.get(`/comments/${this.props.currentProfile.id}/${this.props.userProfile.accountId}`)
      .then((result)=>{
        const rev = result.data.reverse()
        this.setState({
          artistComments: rev
        })
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  render() {
    let comments = this.state.artistComments

    return (
      <div>
          <form onSubmit={(event) => this.submitComment(event)}>
            <input placeholder="Add new comment..." required={true}
              onChange={(event) => { this.handleChange(event.target.value) }} value={this.state.commentValue} />
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
          <div>
          {comments.map((comment)=>{
            return (
              <div>
                <div>{comment.name} commented on {moment(comment.createdAt).format('MMMM Do YYYY, h:mm a')}</div>
                <div>{comment.comment}</div>
              </div>
            )
          })}
          </div>
      </div>
    )
  }
}


export default Comments;