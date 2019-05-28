/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Home.css';
import homeText from '../../res/home-text.png';
import { countdown } from '../../utils/helper-functions';
import { nextRace } from '../../utils/f1-data';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        raceInfo : "",
        raceCountdown : ""
      };
  }

  setRaceInfoText = (data) => {
    const round = data.MRData.RaceTable.round;
    const date = data.MRData.RaceTable.Races[0].date;
    const raceName = data.MRData.RaceTable.Races[0].raceName;
    const time = data.MRData.RaceTable.Races[0].time;
    const circuitName = data.MRData.RaceTable.Races[0].Circuit.circuitName;
    const infoText = `${round} - ${raceName}, ${circuitName}, ${date} - ${time}`
    this.setState({
        raceInfo: infoText,
        raceCountdown : countdown(date, time)
    });
  }

  componentDidMount() {
    nextRace(this.setRaceInfoText);
  }

  render() {
    return (
      <div>
        <div className="text-center">
            <img className="home-image" src={homeText} alt="F1 Races" />
        </div>
        <div className="next-race" >{ this.state.raceInfo } <br/> { this.state.raceCountdown } </div>
      </div>
    );
  }
}


export default Home;