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
import axios from "axios";

// ---Access Token---
// Needs to be refreshed every 3600 miliseconds
// const access_token =

// Get the URL - splits the access token and returns  it
const url = window.location.href;
const url2 = new URL(url);
const access_token = url2.hash.split("&")[0].slice(14);

// -----App Class-----
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // List of empty arrays
      serverData: [],
      searchText: "",
      playlistData: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleChange(event) {
    // handle both of the <select> UI elements
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
    console.log(name);
  }

  handleClick(event) {
    // handle the toggle <button>
    const name = event.target.name;
    this.setState(prevState => ({ [name]: !prevState[name] }));
  }
  // Render for playlist Data and playlist info
  render() {
    let playlistsRender =
      this.state.playlistData.user && this.state.playlistData.user.playlist
        ? this.state.playlistData.user.playlistData.filter(playlistData =>
            playlistData.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase())
          )
        : [];
    const playlistData = playlistsRender.map(pr => (
      <Playlist
        key={pr.id}
        access_token={access_token}
        id={pr.id}
        name={pr.name}
        img={pr.images[0].url}
      />
    ));

    return (
      // In this return I have pulled in all the componants
      <div className="App">
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

            <Filter
              name="searchText"
              label="Search by name"
              value={this.state.searchText}
              handleChange={this.handleChange.bind(this)}
              placeholder={"e.g. My Favourites"}
            />

            {/* Filter accepts a function in this case the playlists -if you have playlist name check...*/}
            {/* <Filter
              onTextChange={text => this.setState({ filterString: text })}
            /> */}
            {/* Map Transforms the playlist array into a new Object */}
            {playlistsRender.map(playlist => (
              <Playlist playlist={playlist} />
            ))}
            {playlistData}
          </div>
        ) : (
          <strong>Loading...</strong>
        ) // prints please wait when screen is loaded
        }
        {/* Footer Class */}
        <Footer />
      </div>
    );
  }
}

export default App;
