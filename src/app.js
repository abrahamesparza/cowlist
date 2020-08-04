import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className="tc b f1">
        <h1>COWLIST</h1>
        <ul className="list">
          <li className="grow tc light-blue w-auto mw-100-1">1</li>
        </ul>
      </div>
    )
  }
};

ReactDOM.render(
  <App/>,
  document.getElementById('root')
  );