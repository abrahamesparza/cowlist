import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: []
    }
  }

  componentDidMount() {
    let url = 'http://localhost:3000/api/cows'
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log('data', data);
      this.setState({
        cows: data
      });
    },
    (err) => {
      console.error(err);
    });
  }

  render() {
    let { cows } = this.state;
    console.log('cows in render:', cows)
    return (
      <div className="tc b f1">
        <h1>COWLIST</h1>
        <ul className="list">
          {cows.map(cow => (
            <li key={cow.id} className="tc f2 washed-red i grow">{cow.name}</li>
          ))}
        </ul>
      </div>
    )
  }
};

ReactDOM.render(
  <App/>,
  document.getElementById('root')
  );