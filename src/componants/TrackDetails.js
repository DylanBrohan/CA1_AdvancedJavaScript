import React, { Component } from "react";

// Components
import Navbar from "./Navbar";
import Footer from "./Footer";

// Axios Pull
import axios from "axios";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";

// ---TrackDetails Component---
class TrackDetails extends Component {
  constructor(props) {
    super(props);
    // Sets the state of trackDetails
    this.state = {
      // Splicing and Splitting access token & TrackId at pieces needed
      trackDetails: [],
      id: this.props.location.hash
        .substr(1)
        .split("&")[0]
        .slice(),
      token: this.props.location.hash
        .substr(24)
        .split("&")[0]
        .slice(),

      loading: false
    };
  }

  // When this page runs send an axios request
  componentDidMount() {
    //   ---Get Request 4---
    // Gets the track by its Id(Through the state)
    axios
      .get(`https://api.spotify.com/v1/tracks/${this.state.id}`, {
        headers: {
          // Gets the Authorization Token
          Authorization: "Bearer " + this.state.token
        }
      })
      // Then Promise - TrackDetails is then populated with the data
      .then(res => {
        console.log(res.data);
        this.setState({
          trackDetails: res.data,
          loading: true
        });
      })
      // Else give back and error
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    //   ---Checking for
    let artists =
      // TrackDetails state is set to artists
      this.state.trackDetails.artists;
    if (this.state.loading) {
      // If there is more than one artist Excecute
      if (artists) {
        artists = "";
        for (let i = 0; i < this.state.trackDetails.artists.length; i++) {
          // if there is more than one artist for the Track
          if (i + 1 !== this.state.trackDetails.artists.length) {
            //   adding artist to the end of string
            artists = artists.concat(
              this.state.trackDetails.artists[i].name + ", "
            );
            // Run else
          } else {
            artists = artists.concat(this.state.trackDetails.artists[i].name);
          }
          console.log(artists);
        }
      } else {
        artists = this.state.trackDetails.artists[0].name;
      }
    }
    // This is pointing to the part of the URL holding the playlist images Id
    let playlistImg = this.props.location.hash.substr(
      this.state.id.length + this.state.token.length + 3
    );
    console.log(playlistImg);
    return (
      // In this Return the Track data is displayed and styled
      <div>
        <Navbar />
        <div className="App">
          <div className="card " style={{}}>
            <div className="card-img " style={{ width: "" }}>
              <h3>Check Out '{artists}s' Popularity !</h3>
              <img
                className="rounded-circle"
                src={playlistImg}
                style={{}}
                alt="..."
              />
            </div>
            <div className="card-body" style={{ width: "" }}>
              <h6 className="card-text">Artist: {artists}</h6>
              <h7 className="card-subtitle mb-2 text-muted">
                Track Name: {this.state.trackDetails.name}
              </h7>
              <br />
              <h7 className="card-subtitle mb-2 text-muted">
                Popularity Rating(0-100): {this.state.trackDetails.popularity}
              </h7>
              <br />
              <br />
              <h7 className="card-subtitle mb-2 text-muted">
                Type: {this.state.trackDetails.type}
              </h7>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

export default TrackDetails;
