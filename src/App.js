import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Calendar from './components/calendar/Calendar';
import Standings from './components/standings/Standings';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSection: 0
    };
    
  }

  setCurrentSection = (sectionIndex) => {
    this.setState({
      currentSection: sectionIndex
    });
  }

  render() {
    let section;
    switch (this.state.currentSection) {
      case 0: section = <Home/>; break;
      case 1: section = <Calendar/>; break;
      case 2: section = <Standings/>; break;
      default: section = <h1>NOTHING</h1>;
    }
    return (
    

      <div className="App">
        <Navbar currentSection={this.state.currentSection} setCurrentSection={this.setCurrentSection}/>
        {section}
      </div>
    );
  }
}


export default App;
