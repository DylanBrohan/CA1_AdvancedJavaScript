// Imports to the REACT application

import React, { Component } from "react";
import "./App.css";

let defaultTextColor = "#000";

let fakeServerData = {
  user: {
    name: "Dylan",
    playlist: [
      {
        name: "My Favourites",
        songs: [
          { name: "Be Humble", duration: 1200 },
          { name: "Thank You, Next", duration: 1300 },
          { name: "The Chain", duration: 1000 }
        ]
      },
      {
        name: "My Favourites",
        songs: [
          { name: "Be Humble", duration: 1200 },
          { name: "Thank You, Next", duration: 1300 },
          { name: "The Chain", duration: 1000 }
        ]
      },
      {
        name: "My Favourites",
        songs: [
          { name: "Be Humble", duration: 1200 },
          { name: "Thank You, Next", duration: 1300 },
          { name: "The Chain", duration: 1000 }
        ]
      },
      {
        name: "My Favourites",
        songs: [
          { name: "Be Humble", duration: 1200 },
          { name: "Thank You, Next", duration: 1300 },
          { name: "The Chain", duration: 1000 }
        ]
      }
    ]
  }
};
class MusicCounter extends Component {
  render() {
    return (
      <div style={{ width: "40%", display: "inline-block" }}>
        <h2 style={{ color: "#defaultTextColor" }}>
          {this.props.playlist.length}Playlist
        </h2>
      </div>
    );
  }
}
class Hours extends Component {
  render() {
    //Reduces playlist to a single arguement
    let allSongs = this.props.playlist.reduce((songs, eachPlaylist) => {
      //this returns each song object within the playlists
      return songs.concat(eachPlaylist.songs);
      //adds each playlists song to the new song array
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      //this returns each song object within the playlists
      return sum + eachSong.duration;
      //adds each playlists song to the new song array
    }, 0);
    // let duration =
    return (
      <div style={{ width: "40%", display: "inline-block" }}>
        <h2 style={{ color: "#defaultTextColor" }}>
          {/* Math.Round is used to round up the decimal numbers(Minutes) of each song  */}
          {Math.round(totalDuration / 60)}Hours Listened
        </h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <img />
        <input type="text" />
        Filter
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div
        style={{
          color: defaultTextColor,
          display: "inline-block",
          width: "25%"
        }}
      >
        <img />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song1</li>
          <li>Song2</li>
          <li>Song3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { serverData: {} };
  }
  // Once seconds have passed, execute the function
  componentDidMount() {
    setTimeout(() => {
      // this applys to the App Components state - serverData
      this.setState({ serverData: fakeServerData });
    }, 3000);
  }
  render() {
    return (
      <div className="App">
        {/* Ternary Operator - if theres a user */}
        {this.state.serverData.user ? (
          <div>
            <h1>
              {this.state.serverData.user.name}
              's Playlists
            </h1>

            <MusicCounter playlist={this.state.serverData.user.playlist} />
            <Hours playlist={this.state.serverData.user.playlist} />
            <Filter />
            <Playlist />
            <Playlist />
            <Playlist />
          </div>
        ) : (
          <h1>Please Wait...</h1>
        )}
      </div>
    );
  }
}

export default App;
