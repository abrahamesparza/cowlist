import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Search from './components/search'
import Cows from './components/cows';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: [],
      name: '',
      description: '',
      display: false,
      selected: '' //intended to store selected cow's description
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let { name, description } = this.state;
    this.setState({
      [e.target.name]: e.target.value
    });
    let data = {
      name: name,
      description: description
    }
    let url = 'http://localhost:3000/api/cows'
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(err => {
      console.log('Error:', err)
    })
    this.componentDidMount()
  }
  // changes display boolean, need to use to display the description of the cow clicked
  handleDescription(e) {
    let cowClicked = e.target.innerText;
    //use above variable to write the functionality to display the description for only the cow selected.
    let { display } = this.state;
    this.setState({
      display: !display,
      selected: cowClicked
    });
  }

  render() {
    let { cows, display, selected} = this.state;
    console.log('cows state in render', cows)
    return (
      <div className="tc b f1">
        <h2 className="tc f2 grow washed-red">Add Cows To Your Moolection</h2>
        <Search submit={this.handleSubmit} change={this.handleChange}/>
        <ul className='list w-100'>
          {cows.map(cow => {
            if (display === false) {
              return <li key={cow._id} className="tc f2 w-90 ml5 washed-red i grow" onClick={this.handleDescription}>{cow.name}</li>
            } else if (display === true && selected === cow.name) {
              return <li key={cow._id} className="tc f1 w-90 ml5 bg-dark-gray washed-red i b grow" onClick={this.handleDescription}>{cow.name}:&nbsp;{cow.description}</li>
            }
          })}
        </ul>
      </div>
    )
  }
};

ReactDOM.render(
  <App/>,
  document.getElementById('root')
  );