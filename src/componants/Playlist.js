// Imports
import React, { Component } from "react";
import axios from "axios";
import Track from "./Tracks";

// import trackDetails from "./TrackDetails";
// import { BrowserRouter, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackData: []
    };
  }
  componentDidMount() {
    /*
      This will be the third axios request. This has to be done since the previous
      request didn't have the full tracks array needed. What I've done here is
      passed in the id field from the second axios request and used it for the
      axios request below.

      I've passed in the access token as well.
      This is done
      by declaring and initialising the variable outside the class in App.js.
      Again, you'll need a way for the program to generate a new token for when
      the old one expires.
    */
    axios
      .get(
        `https://api.spotify.com/v1/playlists/${
          this.props.id
          // Sets the limit of tracks
        }/tracks?offset=0&limit=10`,
        {
          headers: {
            // Pulls in token from props
            Authorization: "Bearer " + this.props.access_token
          }
        }
      )
      .then(res => {
        // Sets the TrackData state
        console.log(res.data.items);
        this.setState({ trackData: res.data.items });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // Maps the Track Data state
    const trackRender = this.state.trackData.map((t, i) => {
      console.log(this.state.trackData[i].track);
      i++;
      return (
        // Takes in the Track fields
        <Track
          key={t.track.id}
          id={t.track.id}
          name={t.track.name}
          artists={t.track.artists}
          album={t.track.album.name}
          popularity={t.track.popularity}
          type={t.track.type}
          access_token={this.props.access_token}
          playlistImg={this.props.img}
        />
      );
    });

    return (
      // In this return the playlists data is pulled in
      <div
        className="col-sm-4"
        style={{
          width: "30%",
          display: "inline-block",
          paddingTop: "10px",
          height: "20%"
        }}
      >
        <div className="card">
          <div className="card-body">
            {/* Gets the name attribute from props */}
            <h3 className="card-title">{this.props.name}</h3>
            <img
              className="card-img-top "
              style={{}}
              src={this.props.img}
              alt="..."
            />

            <p className="card-text  text-left" style={{}}>
              {trackRender}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Playlist;
