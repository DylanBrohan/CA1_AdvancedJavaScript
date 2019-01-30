// Imports to the REACT application
import React, { Component } from "react";
import "./App.css";
import Hours from "./componants/Hours";
import Playlist from "./componants/Playlist";
import Filter from "./componants/Filter";
import MusicCounter from "./componants/MusicCounter";
import Navbar from "./componants/Navbar";
import Footer from "./componants/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "axios";

// ---Access Token---
// Needs to be refreshed every 3600 miliseconds
const access_token =
  "BQDjCsoCXPNj4Mnos9VS0un5fjS01Ox9B5cH5-p1K_n_xir-dWJKinHFltmcYWB2n4bI2SuhHy0ZFQaiIL7-s-Be_azBcfcmwefaRqz-3L_kxpTirr82VGG8bJMpX8_eDGfKB8I71u23y_c";

// -----App Class-----
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // List of empty arrays
      serverData: [],
      filterString: "",
      playlistData: []
    };
  }

  componentDidMount() {
    // ---Request 1---
    //Get Axios request to spotify account
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + access_token
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({ serverData: res.data });
        // ---Request 2---
        // Get request to pull users playlists
        return axios.get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: "Bearer " + access_token
          }
        });
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          playlistData: res.data.items
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  // Render for playlist Data and playlist info
  render() {
    const playlistData = this.state.playlistData.map(pr => (
      <Playlist
        key={pr.id}
        access_token={access_token}
        id={pr.id}
        name={pr.name}
        img={pr.images[0].url}
      />
    ));

    let playlistsRender =
      this.state.playlistData.user && this.state.playlistData.user.playlist
        ? this.state.playlistData.user.playlistData.filter(playlistData =>
            playlistData.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase())
          )
        : [];

    return (
      // In this return I have pulled in all the componants
      <div className="App">
        {/* NavBar Class */}
        <Navbar />

        {/* grabs server data from current state */}
        {this.state.serverData.display_name ? (
          <div>
            <h1>
              {/* Grabs the user Name */}
              {this.state.serverData.display_name}
              's Playlists
            </h1>
            <MusicCounter playlist={playlistsRender} />
            <Hours playlist={playlistsRender} />
            {/* Filter accepts a function in this case the playlists -if you have playlist name check...*/}
            <Filter
              onTextChange={text => this.setState({ filterString: text })}
            />
            {/* Map Transforms the playlist array into a new Object */}
            {playlistsRender.map(playlist => (
              <Playlist playlist={playlist} />
            ))}
            {playlistData}
          </div>
        ) : (
          <h1>Please Wait...</h1>
        ) // prints please wait when screen is loaded
        }
        {/* Footer Class */}
        <Footer />
      </div>
    );
  }
}

export default App;
