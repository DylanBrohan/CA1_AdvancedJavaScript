// Imports to the REACT application
import React, { Component } from "react";
import "./App.css";
import Hours from "./componants/Hours";
import Playlist from "./componants/Playlist";
import Filter from "./componants/Filter";
import MusicCounter from "./componants/MusicCounter";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
let defaultTextColor = "#000";

// Dumby Testing Data
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

// -----App Class-----
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { serverData: {}, filterString: "" };
  }
  componentDidMount() {
    const access_token = axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer" + access_token
        }
      })
      .then(response => {
        // Return the full details of the user.
        console.log(response);
        this.setState({ serverData: response.data });
      })
      .catch(err => {
        console.log(err);
      });

    // Once seconds have passed, execute the function
    setTimeout(() => {
      // this applys to the App Components state - serverData
      this.setState({
        serverData: fakeServerData
      });
    }, 2000);
  }
  render() {
    let playlistsRender = this.state.serverData.user
      ? this.state.serverData.user.playlist.filter(playlist =>
          playlist.name
            .toLowerCase()
            .includes(this.state.filterString.toLowerCase())
        )
      : [];
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

            <MusicCounter playlist={playlistsRender} />
            <Hours playlist={playlistsRender} />
            <Filter
              onTextChange={text => this.setState({ filterString: text })}
            />
            {/* grabs server data from current state */}
            {/* Map Transforms the playlist array into a new Object */}
            {/* Filter accepts a function in this case the playlists -if you have playlist name check...*/}
            {playlistsRender.map(playlist => (
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
