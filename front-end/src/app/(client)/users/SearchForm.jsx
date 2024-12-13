"use client";

import React, { Component } from "react";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  handleChange = (event) => {
    const { onChange } = this.props;
    this.setState({ name: event.target.value });
    if (onChange) {
      onChange(event); // Pass event to parent if `onChange` is provided
    }
  };

  resetName = () => {
    this.setState({ name: "" });
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <input
          type="search"
          className="form-control mb-3"
          value={this.state.name}
          placeholder="Từ khóa..."
          onChange={this.handleChange}
        />
        <button
          type="button"
          onClick={this.resetName}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        ></button>
      </div>
    );
  }
}

export default SearchForm;
