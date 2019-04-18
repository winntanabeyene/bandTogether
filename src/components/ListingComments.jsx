import React from 'react';
import ListView from './ListView';
import Axios from 'axios';
import moment from 'moment';
import CommentModal from './CommentModal'

class ListingComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentValue: '',
      ListingComments: [],
    }
  }
  handleChange(e) {
    this.setState({ commentValue: e })
  }
  submitComment() {
    event.preventDefault();
    const body = {
      comment: this.state.commentValue,
      name: this.props.userProfile.name,
    }
    Axios.post(`/comments/listing/${this.props.listing.id}/${this.props.userProfile.accountId}`, body)
      .then((result) => {
        const rev = result.data.reverse()
        this.setState({
          listingComments: rev,
          commentValue: '',
        })
      })
      .catch((err) => {
        console.log(err)
      })
    console.log('submitted!')
  }


  render() {
    // let comments = this.state.artistComments

    return (
      <div>
        {/* <button type="button" onClick={this.handleClick()} className="btn btn-secondary">See listing comments!</button> */}
        <CommentModal listing={this.props.listing} userProfile={this.props.userProfile} listingComments={this.state.listingComments}/>
        <form onSubmit={(event) => this.submitComment(event)}>
          <input placeholder="Add new comment..." required={true}
            onChange={(event) => { this.handleChange(event.target.value) }} value={this.state.commentValue} />
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}


export default ListingComments;