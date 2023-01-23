import { Outlet } from 'react-router-dom'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'

function App() {
  return (
    <div className="container py-5">
      <Header />
      <hr />
      <Outlet />
      <hr />
      <Footer />
    </div>
  )
}

export default App
