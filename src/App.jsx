import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Agency from './pages/Agency'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import RefundPolicy from './pages/RefundPolicy'
import Contact from './pages/Contact'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agency" element={<Agency />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
