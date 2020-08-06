import React from 'react';


const Cows = ({ cows, click, display } ) => {
  return (
    <div className='tc'>
      <ul className='list w-100'>
      {/* if display === 'true' show clicked cows description otherwise just show all cows.name */}
      {cows.map(cow => {
        if (display === false) {
        return <li key={cow._id} className="tc f2 ba w-90 ml5 washed-red i grow" onClick={click}>{cow.name}</li>
        } else {
          return <li key={cow._id} className="tc f2 ba w-90 ml5 washed-red i grow" onClick={click}>{cow.name}&nbsp;&nbsp;{cow.description}</li>
        }
      })}
      </ul>
    </div>
  )
}

export default Cows;