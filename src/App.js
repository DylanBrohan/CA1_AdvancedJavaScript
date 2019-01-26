// Imports to the REACT application
import React, { Component } from "react";
import "./App.css";
import Hours from "./componants/Hours";
import Playlist from "./componants/Playlist";
import Filter from "./componants/Filter";
import MusicCounter from "./componants/MusicCounter";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "axios";

const access_token =
  "BQD5zWw4yINpgebExoqjy1Eg4e90bffcrA6uIEBxaGUu1wexcfzA9brXAk4K9iH7hQgKS4fXVQSCyKwejKg8qask6cMuS1bIjtIPAq5AIT5VCMTTN2pd7pq04hnVqzeO8T663MNyNPV40qk";

const WrappedLink = () => {
  return (
    <button>
      <Link style={{ display: "block", height: "100%" }} />
    </button>
  );
};

// -----App Class-----
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverData: [],
      filterString: "",
      playlistData: []
    };
  }

  componentDidMount() {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + access_token
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          serverData: res.data
        });

        return axios.get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: "Bearer " + access_token
          }
        });
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          playlistData: res.data.items
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    /*
    What I've done is pulled what you had in the render and put it outside the
    return. It'll be a lot neater and plus, it's what Andrew did in his demos.
  */
    const playlistData = this.state.playlistData.map(pr => (
      <Playlist
        key={pr.id}
        access_token={access_token}
        id={pr.id}
        name={pr.name}
        img={pr.images[0].url}
      />
    ));

    let playlistsRender =
      this.state.playlistData.user && this.state.playlistData.user.playlist
        ? this.state.playlistData.user.playlistData.filter(playlistData =>
            playlistData.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase())
          )
        : [];

    return (
      <div className="App">
        {/* Ternary Operator - if theres a user */}
        {/*
            This is good conditional setting. I'd advise you to consider styling
            it a bit but otherwise, pretty good and I'm stealing this :))
        */}
        {/* grabs server data from current state */}
        {/* Map Transforms the playlist array into a new Object */}
        {/* Filter accepts a function in this case the playlists -if you have playlist name check...*/}

        {this.state.serverData.display_name ? (
          <div>
            <h1>
              {/* Grabs the user Name */}
              {this.state.serverData.display_name}
              's Playlists
            </h1>
            <MusicCounter playlist={playlistsRender} />
            <Hours playlist={playlistsRender} />{" "}
            <Filter
              onTextChange={text => this.setState({ filterString: text })}
            />
            {playlistsRender.map(playlist => (
              <Playlist playlist={playlist} />
            ))}
            {playlistData}
          </div>
        ) : (
          <h1>Please Wait...</h1>
        ) // prints please wait when screen is loaded
        }
      </div>
    );
  }
}

{
  /* <BrowserRouter>
  <div>
    <ul>
      <li>
        <WrappedLink to="https://accounts.spotify.com/en/authorize?client_id=010af8784c1149fc9a3c017578d71361&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&fbclid=IwAR2HPuDl01b_SAFWtAhrUscaoyK5JT_OI9ulSvcufHp2JRkl4K-64xe29iA" />
      </li>
    </ul>
    <hr />
    <Route exact path="/" Component={App} />
  </div>
</BrowserRouter>; */
}

// // -----App Class-----
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { serverData: {}, filterString: "" };
//   }
//   componentDidMount() {
//     const access_token = axios
//       .get("https://api.spotify.com/v1/me", {
//         headers: {
//           Authorization: "Bearer" + access_token
//         }
//       })
//       .then(response => {
//         // Return the full details of the user.
//         console.log(response);
//         this.setState({ serverData: response.data });
//       })
//       .catch(err => {
//         console.log(err);
//       });

//     // Once seconds have passed, execute the function
//     setTimeout(() => {
//       // this applys to the App Components state - serverData
//       this.setState({
//         serverData: fakeServerData
//       });
//     }, 2000);
//   }
//   render() {
//     let playlistsRender = this.state.serverData.user
//       ? this.state.serverData.user.playlist.filter(playlist =>
//           playlist.name
//             .toLowerCase()
//             .includes(this.state.filterString.toLowerCase())
//         )
//       : [];
//     return (
//       <div className="App">
//         {/* Ternary Operator - if theres a user */}
//         {this.state.serverData.user ? (
//           <div>
//             <h1>
//               {/* Grabs the user Name */}
//               {this.state.serverData.user.name}
//               's Playlists
//             </h1>

//             <MusicCounter playlist={playlistsRender} />
//             <Hours playlist={playlistsRender} />
//             <Filter
//               onTextChange={text => this.setState({ filterString: text })}
//             />
//             {/* grabs server data from current state */}
//             {/* Map Transforms the playlist array into a new Object */}
//             {/* Filter accepts a function in this case the playlists -if you have playlist name check...*/}
//             {playlistsRender.map(playlist => (
//               <Playlist playlist={playlist} />
//             ))}
//           </div>
//         ) : (
//           // prints please wait when screen is loaded
//           <h1>Please Wait...</h1>
//         )}
//       </div>
//     );
//   }
// }

export default App;
