import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Exchange from './components/dashboard/Exchange'
import History from './components/dashboard/History'
import Logout from './components/dashboard/Logout'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Exchange/>} />
          <Route path="exchange" element={<Exchange />} />
          <Route path="history" element={<History />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App