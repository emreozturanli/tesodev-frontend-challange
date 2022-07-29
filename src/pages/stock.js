import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tesodev from '../assets/tesodev-sm.png'
import { AppContext } from '../context/AppContext'
import { RiUser3Line, RiArrowUpDownFill} from 'react-icons/ri'

const ListPage = () => {
  const { searchTerm, setSearchTerm, searchedItems, setSearchedItems, data } = useContext(AppContext)
  const navigate = useNavigate()
  const [orderOpen, setOrderOpen] =  useState(false)
  
  useEffect(() => {
    if (searchTerm.length > 1) {
      setSearchedItems(data.filter((item, i) => item[0].includes(searchTerm)))
    } else {
      setSearchedItems([])
    }
  }, [searchTerm])

  const handleClick = (e) =>{
    if(!e.target.classList.contains('order-btn')){
      setOrderOpen(false)
    }
  }
  console.log(searchedItems);
  const ascendingName = () =>{
    setSearchedItems(searchedItems.sort())
  }

  const descendingName = () =>{
    setSearchedItems(searchedItems.sort().reverse())
  }

  const ascendingYear = () =>{
    setSearchedItems(searchedItems.sort((a,b)=>{
      const [ day, month, year]=a[3].split('/')
      const x = [month,day,year].join('/')
      const [ day2, month2, year2]=b[3].split('/')
      const y = [month2,day2,year2].join('/')
      return (new Date(x)) - (new Date(y))
    }))
  }

  const descendingYear = () =>{
    setSearchedItems(searchedItems.sort((a,b)=>{
      const [ day, month, year]=a[3].split('/')
      const x = [month,day,year].join('/')
      const [ day2, month2, year2]=b[3].split('/')
      const y = [month2,day2,year2].join('/')
      return (new Date(y)) - (new Date(x))
    }))
  }


  /* PAGINATION */

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6)

  const pages = [];

  for( let i=1; i<= Math.ceil(searchedItems.length/itemsPerPage); i++){
    pages.push(i);
  }

  const indexOfLastItem = currentPage*itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedItems.slice(indexOfFirstItem,indexOfLastItem)

  const renderPageNumbers = pages.map(number =>{
    return (
      <li key={number} id={number}>
        {number}
      </li>
    )
  })

  return (
    <div className='listpage' onClick={handleClick}>
      <section className='listpage-header'>
        <img src={tesodev} alt="tesodev" />
        <div className='search-bar'>
          <input
            type="search"
            name="search"
            value={searchTerm}
            id="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className='btn-submit list-page-search' type="submit"
        >Search</button>
        <button className='btn-submit list-page-add'
          onClick={() => navigate('/addlink')}
        >Add new record</button>
      </section>
      <section className='listpage-main'>

        <div className={searchedItems.length > 0 ? 'list-page-result' : 'no-search'}>
          {
            searchedItems.map((item, index) => {
              return <>
                <div className='user-info'>
                  <RiUser3Line size={30} />
                  <div className='small-info'>
                    <h5>{item[0]}</h5>
                    <p>{item[1]}</p>
                  </div>
                </div>
                <hr />
              </>
            })
          }
      <ul className='page-numbers'>
      {renderPageNumbers}
      </ul>
        </div>
          <div className="order">
            <button  className='order-btn' onClick={()=> setOrderOpen(!orderOpen)}>
              <RiArrowUpDownFill/> 
              Order By
            </button>
            <div className={orderOpen ? 'order-items d-block': 'order-items'}>
              <p onClick={ascendingName}>Name ascending</p>
              <p  onClick={descendingName}>Name descending</p>
              <p  onClick={ascendingYear}>Year ascending</p>
              <p  onClick={descendingYear}>Year descending</p>
            </div>
          </div>

      </section>
    </div>
  )
}

export default ListPage