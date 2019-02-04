import React from "react";
// -----Filter Class-----
class Filter extends React.Component {
  render() {
    return (
      <div>
        {/* Sets the prop states for the filter  Input Field */}
        <input
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
          className="input"
          type="text"
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

export default Filter;
