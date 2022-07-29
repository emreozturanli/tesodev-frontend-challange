import { createContext, useState } from "react";
import data from '../utils/mockData.json'


export const AppContext = createContext();

const getData = () => {
    const userData = localStorage.getItem('data')
    if (userData) {
      return JSON.parse(localStorage.getItem('data'))
    }
    else {
      localStorage.setItem('data', JSON.stringify(data.data))
    }
  }


const AppContextProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchedItems, setSearchedItems] = useState([])
    const [data, setData] = useState(getData());


    return (
        <AppContext.Provider
            value={{
                searchTerm, 
                setSearchTerm,
                searchedItems, 
                setSearchedItems,
                data, 
                setData

            }}>
                {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider