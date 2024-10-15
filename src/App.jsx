import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Header/Header"
import Homepage from "./Homepage/Homepage"

function App() {
  

  return (
    <div>
        <BrowserRouter>
          <Header></Header>
           <Routes>
              {/* homepage */}
             <Route path="/" element={ <Homepage></Homepage> } > </Route>

           </Routes>
        
        </BrowserRouter>
    </div>
  )
}

export default App
