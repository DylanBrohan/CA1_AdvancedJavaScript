// Imports to the REACT application

import React, { Component } from "react";
import "./App.css";

let defaultTextColor = "#000";

let fakeServerData = {
  user: {
    name: "Dylan",
    playlist: [
      {
        name: "Weekly",
        songs: [
          { name: "Be Humble", duration: 1200 },
          { name: "Thank You, Next", duration: 1300 },
          { name: "The Chain", duration: 1000 }
        ]
      },
      {
        name: "Top 50 Songs",
        songs: [
          { name: "Be Humble", duration: 1200 },
          { name: "Thank You, Next", duration: 1300 },
          { name: "The Chain", duration: 1000 }
        ]
      },
      {
        name: "Hot Hits",
        songs: [
          { name: "Be Humble", duration: 1200 },
          { name: "Thank You, Next", duration: 1300 },
          { name: "The Chain", duration: 1000 }
        ]
      },
      {
        name: "Recommended",
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
        {/* When a Filter key is pressed down - Do This */}
        <input
          type="text"
          onKeyUp={event => this.props.onTextChange(event.target.value)}
        />
        Filter
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div
        style={{
          color: defaultTextColor,
          display: "inline-block",
          width: "25%"
        }}
      >
        <img />
        {/* Gets the name attribute from props */}
        <h3>{playlist.name}</h3>
        <ul>
          {/* Mapping Function that maps the song in each playlist song object - and populates the html list */}
          {playlist.songs.map(song => (
            <li>{song.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { serverData: {}, filterString: "" };
  }
  // Once seconds have passed, execute the function
  componentDidMount() {
    setTimeout(() => {
      // this applys to the App Components state - serverData
      this.setState({ serverData: fakeServerData });
    }, 2000);
  }
  render() {
    return (
      <div className="App">
        {/* Ternary Operator - if theres a user */}
        {this.state.serverData.user ? (
          <div>
            <h1>
              {/* Grabs the user Name */}
              {this.state.serverData.user.name}
              's Playlists
            </h1>

            <MusicCounter playlist={this.state.serverData.user.playlist} />
            <Hours playlist={this.state.serverData.user.playlist} />
            <Filter
              onTextChange={text => this.setState({ filterString: text })}
            />
            {/* grabs server data from current state */}
            {/* Map Transforms the playlist array into a new Object */}
            {/* Filter accepts a function in this case the playlists -if you have playlist name check...*/}
            {this.state.serverData.user.playlist
              .filter(playlist =>
                playlist.name
                  .toLowerCase()
                  .includes(this.state.filterString.toLowerCase())
              )
              .map(playlist => (
                <Playlist playlist={playlist} />
              ))}
          </div>
        ) : (
          // prints please wait when screen is loaded
          <h1>Please Wait...</h1>
        )}
      </div>
    );
  }
}

export default App;
