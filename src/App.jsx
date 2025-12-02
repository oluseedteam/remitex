import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Exchange from './components/dashboard/Exchange'
import History from './components/dashboard/History'
import Logout from './components/dashboard/Logout'
import Homepage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLayout from './components/admin/layout/AdminLayout'
import Users from './components/admin/pages/Users'
import Transactions from './components/admin/pages/Transactions'
import Settings from './components/admin/pages/Settings'
import AdminDashboard from './components/admin/pages/AdminDashboard'


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

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element=  {<Users />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="settings" element={<Settings />} />
      </Route>

    </Routes>
  </Router>
)

export default App