import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {

  renderSongs() {
    const {
      data,
    } = this.props;
    if (!data.loading) {
      return data.songs.map((song) => {
        return(
          <li key={song.id} className="collection-item">
            { song.title }
          </li>
        )
      });
    } else {
      return(
        <div>
          Loading...
        </div>
      )
    }
  }

  render () {
    return(
      <ul className="collection">
        { this.renderSongs() }
      </ul>
    );
  }
}

const query = gql`
  { 
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
