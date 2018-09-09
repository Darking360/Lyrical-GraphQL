import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {

  state = {
    lyric: '',
  };

  handleChangeLyric = ({ target: { value: lyric } }) => {
    this.setState({ lyric })
  }

  handleCreateLyric = (e) => {
    const {
      mutate,
      id: songId
    } = this.props;
    const {
      lyric: content
    } = this.state;
    e.preventDefault();
    mutate({
      variables: {
        songId,
        content
      }
    }).then(() => this.setState({ lyric: '' }))
  }

  render() {
    const {
      lyric
    } = this.state;
    return(
      <form onSubmit={this.handleCreateLyric}>
        <label htmlFor="lyric">Create Lyric</label>
        <input type="text" value={lyric} onChange={this.handleChangeLyric} />
      </form>
    );
  }
  
}

const mutation = gql`
  mutation addLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
