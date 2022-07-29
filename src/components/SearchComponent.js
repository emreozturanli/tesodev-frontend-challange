import React, { useContext, useEffect } from 'react';
import { RiSearchLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import SingleResult from './SingleResult';


const SearchComponent = () => {
    const {searchTerm, setSearchTerm,searchedItems, setSearchedItems,data} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (searchTerm.length > 1) {
            setSearchedItems(data.filter((item) => item[0].includes(searchTerm)))
        }else{
            setSearchedItems([])
        }
    }, [searchTerm])

    const handleSearch = () =>{
        if(searchTerm.length > 1){
            navigate('/list')
        }
    }

    return (
        <section className='search-component'>
            <h1>Find in records</h1>
            <div className="search-input-wrapper">
                <div className='search-bar'>
                    <RiSearchLine size={30} className='search-icon' />
                    <input
                        type="search"
                        name="search"
                        value={searchTerm}
                        id="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className='btn-submit' type="submit" onClick={handleSearch}>Search</button>
            </div>
            {/* <div className={searchTerm.length > 1 ? 'search-result' : 'no-search'}> */}
            <div className={searchedItems.length > 0 ? 'search-result' : 'no-search'}>
                {
                    searchedItems?.slice(0,3).map((item, index) => {
                        return <SingleResult key={index} item={item} />
                    })
                }
                <div style={{textAlign: 'center', marginTop:'1rem'}}>
                    <Link to='/list'>Show more...</Link>
                </div>
            </div>
        </section>
    )
}

export default SearchComponent