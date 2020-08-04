import React from 'react';

const Search = props => {
  return (
    <div className="tc f6">
      <form className="tc pa3 mh3">
        Cow Name:&nbsp;
        <input type='text' name='name' placeholder='Lightning MooQueen' onChange={props.change}/>&nbsp;&nbsp;
        Describe This Cow:&nbsp;
        <input type='text' name='description' placeholder='Description' onChange={props.change}/>&nbsp;&nbsp;
        <input type='button' value='Submit' onClick={props.submit}/>
      </form>
    </div>
  )
};

export default Search;