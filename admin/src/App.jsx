
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/index.jsx";


function App() {
  const router =createBrowserRouter([
        {
            path: "/",
            exact: true,
            element:(

                    <section className="main ">
                        <Header/>

                    </section>
            )
        }
    ])

  return (
    <>
     <RouterProvider router={router } />
    </>
  )
}

export default App
