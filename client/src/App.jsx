import Header from "./components/Header/index.jsx";
import {Route, Routes} from "react-router";
import Home from "./pages/Home/index.jsx";


function App() {

  return (
    <div>
       <Header />
        <Routes>
            <Route path="/" exact={true} element={<Home/>} />

        </Routes>

    </div>
  )
}

export default App
