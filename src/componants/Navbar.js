import React, { Component } from "react";
import { Link } from "react-router-dom";

// ---Track Component---
class Navbar extends Component {
  // Using Bootstrap to create a Navigation bar
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          {/* <Link to="/" className="navbar-brand" href="/">
            My Music
          </Link> */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/callback">
                  My Music{" "}
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://accounts.spotify.com/en/authorize?client_id=010af8784c1149fc9a3c017578d71361&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&fbclid=IwAR3kWYi8IINsax1hb4QA_W5p5oONJtptYv5KQUFYpwrXYlDDlk0YRh8vg5M"
                >
                  Auth Key{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
