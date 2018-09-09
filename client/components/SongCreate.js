import React, { Component } from 'react';

class SongCreate extends Component {

  constructor() {
    super();

    this.state = {
      songTitle: "",
    };
  }

  handleSongTitle = (songTitle) => {
    this.setState({ songTitle });
  }

  render() {
    const {
      songTitle
    } = this.state;
    return(
      <div>
        <h3>Song Create</h3>
        <form>
          <label for="songtitle">Song title</label> 
          <input id="songtitle" value={songTitle} type="text" onChange={this.handleSongTitle}>
        </form>
      </div>
    );
  }

}

export default SongCreate;
