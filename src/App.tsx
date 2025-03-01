import { RouterProvider } from "react-router-dom"
import routes from "@/router/index"
import Providers from "@/providers/reduxProvider"

function App() {

  return (
    <Providers>
        <RouterProvider router={routes} />
    </Providers>
  )
}

export default App
