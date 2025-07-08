import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import AddRoom from './components/room/AddRoom.jsx'
import ExistingRooms from './components/room/ExistingRooms'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import EditRoom from './components/room/EditRoom'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
import ErrorPage from './components/admin/ErrorPage'
import Checkout from './components/booking/Checkout'
import BookingSuccess from './components/booking/BookingSuccess.jsx'
import Bookings from './components/booking/Bookings.jsx'
import FindBooking from './components/booking/FindBooking.jsx'
import Login from './components/auth/Login.jsx'
import Registration from './components/auth/Registrantion.jsx'
import Profile from './components/auth/Profile.jsx'
import Logout from './components/auth/Logout.jsx'
import { AuthProvider } from './components/auth/AuthProvider.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'



function App() {

  return (
    <AuthProvider>
    <main>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route
							path="/book-room/:roomId"
							element={
								<RequireAuth>
									<Checkout />
								</RequireAuth>
							}
						/>
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/existing-bookings" element={<Bookings />} />
          <Route path="/find-booking" element={<FindBooking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />


          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </main>
    </AuthProvider>
  )
}

export default App
