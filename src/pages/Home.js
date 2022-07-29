import React from 'react'
import tesodev from '../assets/tesodev-logo.webp'
import Footer from '../components/Footer'
import News from '../components/News'
import SearchComponent from '../components/SearchComponent'

import {useNavigate} from 'react-router-dom'



const Home = () => {
 
  const navigate = useNavigate()
  return (
    <>
      <main>
        <header>
          <button className='btn-submit' onClick={()=> navigate('/addlink')} >Add new record</button>
        </header>
        <div className="main-logo">
          <div className="img-container">
            <img src={tesodev} width='278px' height='115px' alt="tesodev" title='tesodev-logo' />
          </div>
        </div>
        <SearchComponent />
        <News />
      </main>
      <Footer />
    </>
  )
}

export default Home