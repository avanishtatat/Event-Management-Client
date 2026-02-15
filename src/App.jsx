import {Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/Home'
import EventDetails from './pages/EventDetails'
import Dashboard from './pages/Dashboard'


const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={ <Home />} />
      <Route path='/events/:eventId' element={<EventDetails />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default App