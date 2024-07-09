import React from 'react'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='fourOfour'>
      <h1>Page Not Found :/</h1>
      <h3>
        Vrati se na:
        <Link to="/"> Pocetna </Link>
      </h3>

    </div>
  )
}

export default PageNotFound
