import React, { Component } from 'react';
import { latestDriversStadings, latestConstructorStandings } from '../../utils/f1-data';
import './Standings.css';

class Standings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      driverStandings: "",
      constructorStandings: "",
      year: ""
    }
  }

  setDriverStandings = (data) => {
    const rows = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(standing => {
      return (
        <tr key={standing.position}>
          <td>{standing.position}</td>
          <td>{standing.Driver.givenName + " " + standing.Driver.familyName}</td>
          <td>{standing.Constructors[0].name}</td>
          <td>{standing.points}</td>
          <td>{standing.wins}</td>
        </tr>
      );
    });
    this.setState({
      driverStandings: rows,
      year: data.MRData.StandingsTable.season
    });
  }

  setConstructorStandings = (data) => {
    console.log(data);
    const rows = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(standing => {
      return (
        <tr key={standing.position}>
          <td>{standing.position}</td>
          <td>{standing.Constructor.name}</td>
          <td>{standing.points}</td>
          <td>{standing.wins}</td>
        </tr>
      );
    });
    this.setState({
      constructorStandings: rows
    });
  }

  componentDidMount() {
    latestDriversStadings(this.setDriverStandings);
    latestConstructorStandings(this.setConstructorStandings);
  }
  
  render() {
    return (
      <div id="component">
        <div className="table-container">
        <table className="table table-hover custom-table">
            <thead className="table-header">
              <tr>
                <th scope="col">Position</th>
                <th scope="col">Name</th>
                <th scope="col">Team</th>
                <th scope="col">Points</th>
                <th scope="col">Wins</th>
              </tr>
            </thead>
            <tbody>{this.state.driverStandings}</tbody>
          </table>
        </div>
        <div className="table-container">
        <table className="table table-hover custom-table">
            <thead className="table-header">
              <tr>
              <th>Position</th>
              <th>Team</th>
              <th>Points</th>
              <th>Wins</th>
              </tr>
            </thead>
            <tbody>{this.state.constructorStandings}</tbody>
          </table>
        </div>
      </div>
    );
    }
  }

export default Standings;