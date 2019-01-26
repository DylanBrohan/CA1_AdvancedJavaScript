import React, { Component } from "react";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Track from "./Tracks";

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

      Also good to note that I've passed in the access token as well. This is done
      by declaring and initialising the variable outside the class in App.js.
      Again, you'll need a way for the program to generate a new token for when
      the old one expires.
    */
    axios
      .get(
        `https://api.spotify.com/v1/playlists/${
          this.props.id
        }/tracks?offset=0&limit=15`,
        {
          headers: {
            Authorization: "Bearer " + this.props.access_token
          }
        }
      )
      .then(res => {
        console.log(res.data.items);
        this.setState({ trackData: res.data.items });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    /*
      Below is a similar mapping done. If you understood what the mapping in
      App.js did, you'll have a good idea of what's happening here.

      One thing to note is the commented lines. You can remove them entirely since
      they're only used to log the data I was pulling. Probably best to leave it
      in until you've finished developing in case you need to test how to access
      a particular field in the array.

      If you want to do this, uncomment them and remember to add i to the
      parameters ---> from 't' to (t, i).
    */
    let i = 0;
    const trackRender = this.state.trackData.map((t, i) => {
      console.log(this.state.trackData[i].track);
      i++;
      return (
        <Track
          key={t.track.id}
          id={t.track.id}
          name={t.track.name}
          artists={t.track.artists}
          album={t.track.album.name}
          popularity={t.track.popularity}
          type={t.track.type}
        />
      );
    });

    return (
      <div className="col-sm-4">
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

// import React from "react";

// let defaultTextColor = "#000";

// class Playlist extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     let playlist = this.props.playlist;
//     return (
//       <div
//         style={{
//           color: defaultTextColor,
//           display: "inline-block",
//           width: "25%"
//         }}
//       >
//         <img />
//         {/* Gets the name attribute from props */}
//         <h3>{playlist.name}</h3>
//         <ul>
//           {/* Mapping Function that maps the song in each playlist song object - and populates the html list */}
//           {playlist.songs.map(song => (
//             <li>{song.name}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default Playlist;
