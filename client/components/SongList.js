import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {

  handleDelete = (id) => {
    const {
      mutate,
      data
    } = this.props;
    mutate({
      variables: {
        id
      } 
    }).then(() => {
      data.refetch();
    });
  }

  renderSongs() {
    const {
      data,
    } = this.props;
    if (!data.loading) {
      return data.songs.map((song) => {
        return(
          <Link to={`/songs/${song.id}`}>
            <li key={song.id} className="collection-item"> 
              { song.title }
              <i 
                className="material-icons icon"
                onClick={() => this.handleDelete(song.id)}
              >delete</i>
            </li>
          </Link>
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
      <div>
        <ul className="collection">
          { this.renderSongs() }
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>   
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID){
    deleteSong(id: $id) {
      title
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongList)
);
