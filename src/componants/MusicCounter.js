import React from "react";

// -----MusicCounter Class-----
class MusicCounter extends React.Component {
  render() {
    return (
      <div style={{ width: "40%", display: "inline-block" }}>
        <h2 style={{ color: "#defaultTextColor" }}>
          {/* Gets length of playlists and displays */}
          You Have: {this.props.playlist.length} Playlist's
        </h2>
      </div>
    );
  }
}

export default MusicCounter;
