import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

import axios from "axios";

class TrackDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  componentDidMount() {
    axios
      .get(`https://api.spotify.com/v1/tracks/${this.state.id}`, {
        headers: {
          // Gets the Authorization Token
          Authorization: "Bearer " + this.state.token
        }
      })
      // Then Promise - serverData is then populated with the data
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
    let artists = this.state.trackDetails.artists;
    if (this.state.loading) {
      if (artists) {
        artists = "";
        for (let i = 0; i < this.state.trackDetails.artists.length; i++) {
          if (i + 1 !== this.state.trackDetails.artists.length) {
            artists = artists.concat(
              this.state.trackDetails.artists[i].name + ", "
            );
          } else {
            artists = artists.concat(this.state.trackDetails.artists[i].name);
          }
        }
      } else {
        artists = this.state.trackDetails.artists[0].name;
      }
    }
    let playlistImg = this.props.location.hash.substr(
      this.state.id.length + this.state.token.length + 3
    );
    console.log(playlistImg);
    return (
      // In this Return the Track data is displayed and styled
      <div className="App">
        <Navbar />

        <div className="card " style={{}}>
          <div className="card-img " style={{ width: "" }}>
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
    );
  }
}

export default TrackDetails;
