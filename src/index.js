import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
// import axios from "axios";

ReactDOM.render(<App />, document.getElementById("root"));

var request = require("request"); // "Request" library

var client_id = "010af8784c1149fc9a3c017578d71361"; // Your client id
var client_secret = "904cd4801c6d4924b273718f617f99ac"; // Your secret

// axios.get(
//   `https://cors-anywhere.herokuapp.com/
//         `,
//   { headers: { "Access-Control-Allow-Origin": "*" } }
// );
// your application requests authorization
var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};
console.log(authOptions);
request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: "http://localhost:3000/callback",
      headers: { Authorization: "Bearer " + token },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});
// Send a POST request
// axios(authOptions).then(response){
//     console.log(response);
// }
