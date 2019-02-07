// Imports to the REACT application
import React, { Component } from "react";
import "./App.css";

// ---Components---
import Playlist from "./componants/Playlist";
import Filter from "./componants/Filter";
import MusicCounter from "./componants/MusicCounter";
import Navbar from "./componants/Navbar";
import Footer from "./componants/Footer";
import Public from "./componants/Public";
import Spinner from "./componants/Spinner";

// Axios
import axios from "axios";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";

// Main Routes File
import "./App.css";
import RadioButton from "./componants/RadioButton";

// ---Access Token---
// Needs to be refreshed every 3600 miliseconds
// Get the URL - splits the access token and returns  it
const url = window.location.href;
const url2 = new URL(url);
const access_token = url2.hash.split("&")[0].slice(14);

// -----App Class-----
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // List of empty arrays
      serverData: [],
      searchText: "",
      playlistData: [],
      publicSelected: "true"
    };
    // Binds the state of handle Change & Click
    this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // ---Request 1---
    //Get Request to spotify account
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          // Gets the Authorization Token
          Authorization: "Bearer " + access_token
        }
      })
      // Then  - serverData is then populated with the data
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
      // PlaylistData then gets the items from playlists
      .then(res => {
        console.log(res.data);
        this.setState({
          playlistData: res.data.items
        });
      })
      // Else give back and error
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(event) {
    // handles both of the <select> UI elements
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
    console.log(name);
  }

  // Render for playlist Data and playlist info
  render() {
    const data =
      this.state.sort === "no"
        ? this.state.playlist
        : [].concat(this.state.playlist).sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });

    let playlistsRender =
      // if serverData state & playlistData state
      //  Filter playlistData & populate with the following
      // else empty array
      this.state.serverData && this.state.playlistData
        ? this.state.playlistData.filter(playlistData =>
            playlistData.name
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase())
          )
        : [];
    console.log(data);

    let AlbumList = playlistsRender.map(playlist => (
      <Playlist
        playlist={playlist}
        key={playlist.id}
        access_token={access_token}
        id={playlist.id}
        name={playlist.name}
        img={playlist.images[0].url}
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
            {/* PlaylistRender is called  */}
            {/* Dynamic Component */}
            <MusicCounter playlist={playlistsRender} />
            {/* Filter Component is called and values are set */}
            <Filter
              name="searchText"
              label="Search by name"
              value={this.state.searchText}
              handleChange={this.handleChange.bind(this)}
              placeholder={"e.g. My Favourites"}
            />
            <Public
              options={["all", "true", "false"]}
              name="publicSelected"
              handleChange={this.handleChange.bind(this)}
              label="Filter by Public Playlist"
              selected={this.state.publicSelected}
            />

            <RadioButton
              handleChange={this.handleChange}
              checked={this.state.sort}
            />

            {AlbumList}
            {/* Map Transforms the playlist array into a new Object */}
          </div>
        ) : (
          <div>
            <p>Please Get Auth Key</p>
            <Spinner />
          </div>
        )}
        {/* Footer Component */}
        <Footer />
      </div>
    );
  }
}

export default Home;
