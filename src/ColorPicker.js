import React from "react";
import { TwitterPicker } from "react-color";

export class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      color: this.props.color
    };
  }

  render() {
    return (
      <div className="picker">
        <TwitterPicker
          width="205px"
          triangle="hide"
          color={this.state.color}
          onChange={this.props.handler}
          colors={[
            "black",
            "#ffcc66",
            "#66ff7c",
            "#1c215b",
            "#ff6666",
            "white"
          ]}
        />
      </div>
    );
  }
}

export default ColorPicker;
