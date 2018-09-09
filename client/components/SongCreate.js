import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {

  constructor() {
    super();

    this.state = {
      songTitle: "",
    };
  }

  handleSongTitle = ({ target: { value: songTitle } }) => {
    this.setState({ songTitle });
  }

  handleSubmit = (e) => {
    const {
      songTitle
    } = this.state;
    e.preventDefault();
    this.props.mutate({
      variables: {
        title: songTitle
      },
      refetchQueries: [
        { query }
      ]
    }).then(() => {
      hashHistory.push('/');
    }).catch(() => {
      
    });
  }

  render() {
    const {
      songTitle
    } = this.state;
    return(
      <div>
        <Link to="/">Back</Link>
        <h3>Song Create</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="songtitle">Song title</label> 
          <input id="songtitle" value={songTitle} type="text" onChange={this.handleSongTitle} />
        </form>
      </div>
    );
  }

}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
