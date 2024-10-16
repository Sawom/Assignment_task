import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Header/Header"
import Homepage from "./Homepage/Homepage"
import WishlistPage from "./WishlistPage/WishlistPage"
import BookDetails from "./BookDetails/BookDetails"

function App() {
  

  return (
    <div>
        <BrowserRouter>
          <Header></Header>
           <Routes>
              {/* homepage */}
              <Route path="/" element={ <Homepage></Homepage> } > </Route>
              {/* wishlist page */}
              <Route path='/wishlist' element={ <WishlistPage></WishlistPage> } ></Route>
              {/* book details */}
              <Route path='bookinfo/:id' element={ <BookDetails></BookDetails> } ></Route>
           </Routes>
        
        </BrowserRouter>
    </div>
  )
}

export default App
