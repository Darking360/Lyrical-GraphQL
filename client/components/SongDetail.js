import React, { Component } from 'react';
import query from '../queries/fetchSong';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';

class SongDetail extends Component {

  renderSongDetail = () => {
    const {
      data: {
        loading,
        song
      }
    } = this.props;
    if (loading) {
      return(
        <div>
          Loading...
        </div>
      );
    } else if(song) {
      return(
         <div>
          <h3>
            { song.title }
          </h3>
          <LyricCreate id={song.id} />
          <h3>Lyrics</h3>
          <ul className="collection">
            { this.renderLyrics(song.lyrics) }
          </ul>
         </div>
      );
    }
  }

  renderLyrics = (lyrics) => {
    return lyrics.map((lyric) => {
      return(
        <li key={lyric.id} className="collection-item">
          { lyric.content }
        </li>
      )
    })
  }

  render() {
    return(
      <div>
        <Link to="/">Back</Link>
        { this.renderSongDetail() }
      </div>
    );
  }

}

export default graphql(
  query,
  {
    options: (props) => {
      return {
        variables: {
          id: props.params.id
        }
      }
    }
  }
)(SongDetail);
