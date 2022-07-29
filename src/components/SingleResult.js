import React from 'react'
import { RiUser3Line } from 'react-icons/ri'
const SearchResultList = ({ item }) => {
  return (
    <>
      <div className='user-info'>
        <RiUser3Line size={30} />
        <div className='small-info'>
          <h5>{item[0]}</h5>
          <p>{item[1]}</p>
        </div>
      </div>
      <hr />
    </>

  )
}

export default SearchResultList