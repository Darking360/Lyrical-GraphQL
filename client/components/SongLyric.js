import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongLyric extends Component {

  thumbsUp = (id, likes) => {
    const {
      mutate,
    } = this.props;
    mutate({
      variables: {
        id
      },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
    });
  }

  render() {
    const {
      lyric
    } = this.props;
    return(
      <li key={lyric.id} className="collection-item">
        { lyric.content }
        <div className="likes-container">
          <span>{lyric.likes}</span>
          <i className="material-icons icon" onClick={() => this.thumbsUp(lyric.id, lyric.likes)}>thumb_up</i>
        </div>
      </li>
    );
  }

}

const mutation = gql`
  mutation likeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(SongLyric);
