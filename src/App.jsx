import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Preloader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
