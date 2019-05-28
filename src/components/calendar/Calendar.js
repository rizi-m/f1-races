/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { raceSchedule } from '../../utils/f1-data';
import { countdown } from '../../utils/helper-functions';
import './Calendar.css';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
        raceInfo : "",
        raceCountdown : ""
      };
  }

  setRaceScheduleData = (data) => {
    const rows = data.MRData.RaceTable.Races.map((race) => {
      //const date = new Date(`${race.date}T${race.time}`).getTime();
      let eta = countdown(race.date, race.time);
      eta = eta.includes("-") ? "DONE" : eta;
      return (
        <tr key={race.round}>
          <th scope="row">{race.round}</th>
          <td>{race.raceName}</td>
          <td>{race.date}</td>
          <td>{race.time}</td>
          <td>{race.Circuit.circuitName}</td>
          <td>{race.Circuit.Location.country}</td>
          <td>{eta}</td>
        </tr>
      )
    });

    this.setState({
      raceData: rows
    });
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
    raceSchedule(2019, this.setRaceScheduleData);
  }

  render() {
    return (
      <div className="component">
        <div className="table-container"> 
          <div className="table-responsive">
              <table className="table table-hover custom-table">
                <thead className="table-header">
                  <tr>
                    <th scope="col">Round</th>
                    <th scope="col">Race Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Circuit</th>
                    <th scope="col">Location</th>
                    <th scope="col">Countdown</th>
                  </tr>
                </thead>
                <tbody>
                    {this.state.raceData}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    );
  }
}


export default Calendar;