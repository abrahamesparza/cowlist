import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Search from './components/search'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: [],
      name: '',
      description: '',
      display: false,
      selected: '', //intended to store selected cow's description
      edit: false,
      updatedName: '',
      updatedDesc: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.updateCow = this.updateCow.bind(this);
    this.updateCowState = this.updateCowState.bind(this);
    this.updateCowInfo = this.updateCowInfo.bind(this);
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

  updateCowState(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  updateCow(e) {
    let url = `http://localhost:3000/cow/name`
    let { selected, edit, cows, updatedName, updatedDesc } = this.state;
    this.setState({
      [e.target.name]: e.target.value
    })
    let data = {
      selected: selected,
      // name: updatedName,
      // description: updatedDesc
    }
    // console.log('data in update:',data);
    let options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    if (edit !== true) {
      this.setState({
        edit: !edit
      })
      fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.log('updated data', data);
      })
      .catch(err => console.error('error:',err))
    } else {
      this.setState({
        edit: false
      })
      console.log('not editing')
    }
  }

  updateCowInfo(e) {
    let url = `http://localhost:3000/cow/name`
    let { edit, updatedName, updatedDesc } = this.state;
    this.setState({
      [e.target.name]: e.target.value
    });
    let data = {
      name: updatedName,
      description: updatedDesc
    };
    let options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    if (edit !== true) {
      this.setState({
        edit: !edit
      })
      fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.log('updated data', data);
      })
      .catch(err => console.error('error:',err))
    } else {
      this.setState({
        edit: false
      })
      console.log('not editing')
    }
  }

  render() {
    let { cows, display, selected, edit } = this.state;
    console.log('edit',edit)
    console.log('cows state in render', cows)
    return (
      <div className="tc b f1">
        <h2 className="tc f2 grow washed-red">Add Cows To Your Moolection</h2>
        <Search submit={this.handleSubmit} change={this.handleChange}/>
        <ul className='list w-100'>
          {cows.map(cow => {
            if (display === false) {
              return (
                <div>
              <li key={cow._id} className="tc f2 w-90 ml5 near-black i grow" onClick={this.handleDescription}>{cow.name}</li>
              <div className='tr mr5'>
              </div>
                </div>
              )
            } else if (display === true && selected === cow.name) {
              if (edit === true) {
                return (
                  <div>
                  <h2 className='bg-orange'>Update Cow</h2>
                    <form className="tc pa3 mh3 f3">
                      Edit Cow Name:&nbsp;
                      <input  type='text' name='updatedName' placeholder='Lightning MooQueen' onChange={this.updateCowState}/>&nbsp;&nbsp;
                      Edit Cow Description:&nbsp;
                      <input type='text' name='updatedDesc' placeholder='Description' onChange={this.updateCowState}/>&nbsp;&nbsp;
                      <input type='button' value='Submit' onClick={this.updateCowInfo}/>
                    </form>
                  </div>
                )
              } else {
                  return (
                  <div>
                    <li key={cow._id} className="tc f1 w-90 ml5 bg-dark-gray washed-red i b grow" onClick={this.handleDescription}>{cow.name}<br/>{cow.description}</li>
                    <div>
                    <input className='h2 w3 f5 tc' type='button' value='edit' onClick={this.updateCow}/>
                    </div>
                  </div>
                )
              }
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