/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Navbar.css';


class Navbar extends Component {

  constructor(props) {
    super(props);
    let statuses = ["", "", ""];
    statuses[props.currentSection] = "active";
    this.state = {
      activeStatuses: statuses
    }
  }

  linkClicked = (idx) => { 
    this.setState({
        activeStatuses: this.state.activeStatuses.map((status, current) => current === idx ? "active" : "")
    });
    this.props.setCurrentSection(idx);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                    <li className={"nav-item " + this.state.activeStatuses[0]}>
                        <a onClick={() => this.linkClicked(0)} className="nav-link" href="javascript:void(0)">Home</a>
                    </li>
                    <li className={"nav-item " + this.state.activeStatuses[1]}>
                        <a onClick={() => this.linkClicked(1)} className="nav-link" href="javascript:void(0)">Calendar</a>
                    </li>
                    <li className={"nav-item " + this.state.activeStatuses[2]}>
                        <a onClick={() => this.linkClicked(2)} className="nav-link" href="javascript:void(0)">Standings</a>
                    </li>
                </ul>
            </div>
        </nav>
      </div>
    );
  }
}


export default Navbar;