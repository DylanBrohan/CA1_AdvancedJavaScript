import React from "react";

// -----Filter Class-----
class Filter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <img />
        {/* When a Filter key is pressed down - Do This */}
        <input
          type="text"
          onKeyUp={event => this.props.onTextChange(event.target.value)}
          placeholder={"e.g. My Playlist"}
        />
        Filter
      </div>
    );
  }
}

export default Filter;
