import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Exchange from './components/dashboard/Exchange'
import History from './components/dashboard/History'
import Logout from './components/dashboard/Logout'
import Homepage from './pages/HomePage'
import About from './pages/about'
import Contact from './pages/contact'


const App = () => (
  <Router>
    <Routes>
      <Route path='/home' element={<Homepage />} />
      <Route index element={<Homepage />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Exchange />} />
        <Route path="/dashboard/exchange" element={<Exchange />} />
        <Route path="/dashboard/history" element={<History />} />
        <Route path="dashboard/logout" element={<Logout />} />
      </Route>
    </Routes>
  </Router>
)

export default App