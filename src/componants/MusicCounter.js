import React from "react";
import ReactDOM from "react-dom";

// -----MusicCounter Class-----
class MusicCounter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ width: "40%", display: "inline-block" }}>
        <h2 style={{ color: "#defaultTextColor" }}>
          {this.props.playlist.length}Playlist
        </h2>
      </div>
    );
  }
}

export default MusicCounter;
