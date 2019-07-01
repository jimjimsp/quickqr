/* global chrome */
/*"use strict";*/

import React from "react";
import ColorPicker from "./ColorPicker.js";
import html2canvas from "html2canvas";
import CogIcon from "./CogIcon.js";
import DownloadIcon from "./DownloadIcon.js";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handleColorChange.bind(this);

    this.state = {
      code_link: "www.hemsida.com",
      code_size: 128,
      code_top_position: 67,
      code_bg_color: "#FFFFFF",
      code_fg_color: "#000000",
      code_include_margin: true,
      color_selected_bg: "selected",
      color_selected_fg: "",
      wrapper_size: 128,
      in_settings: false,
      inputValue: ""
    };
  }

  render() {
    var QRCode = require("qrcode.react");
    if (!this.state.in_settings) {
      return (
        <div className="frame">
          <p className="frame-title">
            Quick
            <span className="frame-span">
              <b>QR</b>
            </span>
          </p>
          <div
            className="settings"
            onClick={this.toggleSettingsMenu.bind(this)}
          >
            <CogIcon />
          </div>
          <div
            className="code-bkg"
            style={{
              width: this.state.code_size + "px",
              height: this.state.code_size + "px",
              left: (240 - this.state.code_size) / 2 + "px",
              top: this.state.code_top_position + "px"
            }}
          >
            <div
              className="code-content-wrapper"
              style={{
                width: parseInt(32 + parseInt(this.state.code_size)) + "px",
                height: parseInt(32 + parseInt(this.state.code_size)) + "px"
              }}
            >
              <QRCode
                className="code-content"
                value={this.state.code_link}
                size={parseInt(this.state.code_size)}
                bgColor={this.state.code_bg_color}
                fgColor={this.state.code_fg_color}
                includeMargin={this.state.code_include_margin}
              />
            </div>
          </div>
          <hr className="line-one" />
          <p className="auto-title">Generating QR-code for:</p>
          <input
            className="auto-input"
            value={this.state.code_link}
            spellCheck="false"
            readOnly={true}
          />
          <hr className="line-two" />
          <p className="input-title">Manual input:</p>
          <form onSubmit={this.submitHandler.bind(this)}>
            <input
              className="input-input"
              value={this.state.inputValue}
              onChange={evt => this.updateInputValue(evt)}
              spellCheck="false"
            />
          </form>
          <div
            className="input-button"
            onClick={this.generateCodeManual.bind(this)}
          >
            Generate!
          </div>
          <div className="download" onClick={this.generatePDF.bind(this)}>
            <DownloadIcon />
          </div>
        </div>
      );
    } else {
      return (
        <div className="frame">
          <p className="frame-title">
            Quick
            <span className="frame-span">
              <b>QR</b>
            </span>
          </p>
          <div
            className="settings"
            onClick={this.toggleSettingsMenu.bind(this)}
          >
            <CogIcon />
          </div>
          <p className="settings-title">Settings:</p>
          <p className="settings-bkg-text">Background:</p>
          <p className="settings-fg-text">Foreground:</p>
          <div
            className={"test-bkg " + this.state.color_selected_bg}
            onClick={this.handleChangeSelectorBg.bind(this)}
            style={{
              backgroundColor: this.state.code_bg_color
            }}
          />
          <div
            className={"test-fg " + this.state.color_selected_fg}
            onClick={this.handleChangeSelectorFg.bind(this)}
            style={{
              backgroundColor: this.state.code_fg_color
            }}
          />
          <ColorPicker className="picker" handler={this.handler} />
          <p className="title-preview">Preview:</p>
          <QRCode
            className="preview"
            value={this.state.code_link}
            size={50}
            bgColor={this.state.code_bg_color}
            fgColor={this.state.code_fg_color}
            includeMargin={this.state.code_include_margin}
          />
          <p className="title-size">Code size:</p>
          <select
            className="size-pick"
            value={this.state.code_size}
            onChange={this.handleSizeChange.bind(this)}
          >
            <option value="100">Small</option>
            <option value="128">Medium</option>
            <option value="150">Large</option>
          </select>
          <p className="title-margin">Include margin:</p>
          <label className="margin-pick">
            <input
              className="checkbox"
              type="checkbox"
              checked={this.state.code_include_margin}
              onChange={this.toggleIncludeMargin.bind(this)}
            />
          </label>
        </div>
      );
    }
  }

  componentDidMount() {
    this.generateCode(this);
  }

  handleColorChange = color => {
    if (this.state.color_selected_bg === "selected") {
      this.setState({ code_bg_color: color.hex });
    } else {
      this.setState({ code_fg_color: color.hex });
    }
  };

  handleChangeSelectorBg() {
    if (this.state.color_selected_bg === "") {
      this.setState({
        color_selected_bg: "selected",
        color_selected_fg: ""
      });
    }
  }

  handleChangeSelectorFg() {
    if (this.state.color_selected_fg === "") {
      this.setState({
        color_selected_bg: "",
        color_selected_fg: "selected"
      });
    }
  }

  handleBgChange = color => {
    this.setState({ code_bgColor: color.hex });
  };

  handleSizeChange(event) {
    this.setState({
      code_size: event.target.value
    });
    this.setSizeChangePosition(event.target.value);
  }

  submitHandler(evt) {
    evt.preventDefault();
    this.generateCodeManual();
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  generateCodeHelper() {
    this.generateCode(this);
  }

  generateCodeManual() {
    if (this.state.inputValue.length < 2000) {
      this.setState({
        code_link: this.state.inputValue
      });
    }
  }

  toggleSettingsMenu() {
    this.setState({ in_settings: !this.state.in_settings });
    this.forceUpdate();
  }

  setSizeChangePosition(value) {
    if (value === "150" || value === "128") {
      this.setState({
        code_top_position: 64 - (parseInt(value) - 128) + 3
      });
    } else if (value === "100") {
      this.setState({
        code_top_position: 64 - (parseInt(value) - 128) - 15
      });
    } else {
      console.log("Invalid state: code_top_position");
    }
  }

  toggleIncludeMargin() {
    this.setState({
      code_include_margin: !this.state.code_include_margin
    });
  }

  generatePDF() {
    const jsPDF = require("jspdf");
    const filename =
      "QuickQR_" + this.state.code_link.substring(0, 15) + ".pdf";
    var docSize = this.state.code_size;

    html2canvas(document.querySelector(".code-content-wrapper")).then(
      canvas => {
        var pdf = new jsPDF("p", "px", [docSize, docSize]);
        pdf.addImage(
          canvas.toDataURL("image/pdf"),
          "PNG",
          0,
          0,
          0.83 * docSize,
          0.83 * docSize
        );
        pdf.save(filename);
      }
    );
  }

  generateCode(node) {
    chrome.tabs.query({ lastFocusedWindow: true, active: true }, function(
      tabs
    ) {
      node.setState({
        code_link: tabs[0].url
      });
    });
  }
}

export default App;
