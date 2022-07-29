import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import ListPage from './ListPage'
import AddLinkPage from './AddLinkPage'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/list" element={<ListPage/>}/>
                <Route path="/addlink" element={<AddLinkPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter