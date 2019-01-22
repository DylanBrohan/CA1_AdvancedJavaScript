import React from "react";

let defaultTextColor = "#000";

class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }
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

export default Playlist;
