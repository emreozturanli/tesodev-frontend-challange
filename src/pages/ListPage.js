import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tesodev from '../assets/tesodev-sm.png'
import { AppContext } from '../context/AppContext'
import { RiUser3Line, RiArrowUpDownFill } from 'react-icons/ri'

const ListPage = () => {
  const { searchTerm, setSearchTerm, searchedItems, setSearchedItems, data } = useContext(AppContext)
  const navigate = useNavigate()
  const [orderOpen, setOrderOpen] = useState(false)

  useEffect(() => {
    if (searchTerm.length > 1) {
      setSearchedItems(data.filter((item, i) => item[0].includes(searchTerm)))
    } else {
      setSearchedItems([])
    }
  }, [searchTerm])

  const handleClick = (e) => {
    if (!e.target.classList.contains('order-btn')) {
      setOrderOpen(false)
    }
  }

  const ascendingName = () => {
    setSearchedItems(searchedItems.sort())
  }

  const descendingName = () => {
    setSearchedItems(searchedItems.sort().reverse())
  }

  const ascendingYear = () => {
    setSearchedItems(searchedItems.sort((a, b) => {
      const [day, month, year] = a[3].split('/')
      const x = [month, day, year].join('/')
      const [day2, month2, year2] = b[3].split('/')
      const y = [month2, day2, year2].join('/')
      return (new Date(x)) - (new Date(y))
    }))
  }

  const descendingYear = () => {
    setSearchedItems(searchedItems.sort((a, b) => {
      const [day, month, year] = a[3].split('/')
      const x = [month, day, year].join('/')
      const [day2, month2, year2] = b[3].split('/')
      const y = [month2, day2, year2].join('/')
      return (new Date(y)) - (new Date(x))
    }))
  }


  /* PAGINATION */

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handlePageClick = (e) => {
    setCurrentPage(Number(e.target.id))
  }

  const pages = [];

  for (let i = 1; i <= Math.ceil(searchedItems.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedItems.slice(indexOfFirstItem, indexOfLastItem)

  const renderPageNumbers = pages.map(number => {

    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li key={number} id={number} onClick={handlePageClick} className={currentPage === number ? 'active' : null}>
          {number}
        </li>
      )
    } else {
      return null
    }
  })

  /* buttons*/

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  /* dots */

  let pageIncrementBtn = null;

  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    <div className='listpage' onClick={handleClick}>
      <section className='listpage-header'>
        <img src={tesodev} alt="tesodev" />
        <div className='search-bar listpage-search-bar'>
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
            currentItems.map((item, index) => {
              return <div style={{marginBottom:'2rem'}} key={index}>
                <div className='user-info'>
                  <RiUser3Line size={30} />
                  <div className='small-info'>
                    <h5>{item[0]}</h5>
                    <p>{item[1]}</p>
                  </div>
                  <div className='date-info'>
                    <h3>{item[3]}</h3>
                  </div>
                </div>
                <hr />
              </div>
            })
          }
          <ul className='page-numbers'>
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage === pages[0] ? true : false}
              >
                Previous
              </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
              <button
                onClick={handleNextbtn}
                disabled={currentPage === pages[pages.length - 1] ? true : false}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
        <div className="order">
          <button className='order-btn' onClick={() => setOrderOpen(!orderOpen)}>
            <RiArrowUpDownFill />
            Order By
          </button>
          <div className={orderOpen ? 'order-items d-block' : 'order-items'}>
            <p onClick={ascendingName}>Name ascending</p>
            <p onClick={descendingName}>Name descending</p>
            <p onClick={ascendingYear}>Year ascending</p>
            <p onClick={descendingYear}>Year descending</p>
          </div>
        </div>

      </section>
    </div>
  )
}

export default ListPage