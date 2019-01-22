import React from "react";
import ReactDOM from "react-dom";

class Hours extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //Reduces playlist to a single arguement
    let allSongs = this.props.playlist.reduce((songs, eachPlaylist) => {
      //this returns each song object within the playlists
      return songs.concat(eachPlaylist.songs);
      //adds each playlists song to the new song array
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      //this returns each song object within the playlists
      return sum + eachSong.duration;
      //adds each playlists song to the new song array
    }, 0);
    // let duration =
    return (
      <div style={{ width: "40%", display: "inline-block" }}>
        <h2 style={{ color: "#defaultTextColor" }}>
          {/* Math.Round is used to round up the decimal numbers(Minutes) of each song  */}
          {Math.round(totalDuration / 60)}Hours Listened
        </h2>
      </div>
    );
  }
}

export default Hours;
