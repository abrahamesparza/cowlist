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
      display: false
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
    let { display } = this.state;
    this.setState({
      display: !display
    });
    console.log(e.target);
  }

  render() {
    let { cows, display } = this.state;
    console.log('cows state in render', cows)
    return (
      <div className="tc b f1">
        <h2 className="tc f2 grow washed-red">Add Cows To Your Moolection</h2>
        <Search submit={this.handleSubmit} change={this.handleChange}/>
        <Cows cows={cows} display={display} click={this.handleDescription}/>
      </div>
    )
  }
};

ReactDOM.render(
  <App/>,
  document.getElementById('root')
  );