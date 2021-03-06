import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Track extends Component {
  render() {
    /*
          The artists variable is storing the passed in array. From there, there are two scenarios:

            1. If there are more than one artist, reinitialise to be an empty string.
               Then, loop through the array and concatenate to the artists string.
               If there are more artists to loop through, append a comma. If not,
               just add the name of the artist.
            2. If there's only one artist, just reinitalise the variable to be that
               artist's name. The [0] is there to point to the first element of the
               array.

// ---This functionality is used to concatinate if there are 2 artists for one track---

        */
    let artists = this.props.artists;
    //  If there are more than one artist, reinitialise to be an empty string.
    if (artists.length > 0) {
      artists = "";
      //  loop through the array and concatenate to the artists string.
      for (let i = 0; i < this.props.artists.length; i++) {
        //  If there are more artists to loop through, append a comma. If not,
        //  just add the name of the artist.
        if (i + 1 !== this.props.artists.length) {
          artists = artists.concat(this.props.artists[i].name + ", ");
        } else {
          // If there's only one artist, just reinitalise the variable to be that
          //      artist's name.
          artists = artists.concat(this.props.artists[i].name);
        }
      }
    } else {
      artists = this.props.artists[0].name;
    }

    return (
      // In this Return the Track data is displayed and styled
      <div className="card ">
        <div className="card-body">
          <h6 className="card-text">Artist: {artists}</h6>
          <h7 className="card-subtitle mb-2 text-muted">
            Track Name: {this.props.name}
          </h7>
          <br />
          <br />
          <button className="btn btn-secondary">
            <Link
              className="btn btn-secondary"
              to={`/trackDetails#${this.props.id}&${this.props.access_token}&${
                this.props.playlistImg
              }`}
            >
              Details On: {this.props.name}
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Track;
