import React from "react";

class RadioButton extends React.Component {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Sort by Playlist?</label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="sort"
                  value="yes"
                  checked={this.props.checked === "yes"}
                  onChange={this.props.handleChange}
                />
                yes
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="sort"
                  value="no"
                  checked={this.props.checked === "no"}
                  onChange={this.props.handleChange}
                />
                no
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RadioButton;
