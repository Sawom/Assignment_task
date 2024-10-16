import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Header/Header"
import Homepage from "./Homepage/Homepage"
import WishlistPage from "./WishlistPage/WishlistPage"

function App() {
  

  return (
    <div>
        <BrowserRouter>
          <Header></Header>
           <Routes>
              {/* homepage */}
              <Route path="/" element={ <Homepage></Homepage> } > </Route>
              <Route path='/wishlist' element={ <WishlistPage></WishlistPage> } ></Route>
           </Routes>
        
        </BrowserRouter>
    </div>
  )
}

export default App
