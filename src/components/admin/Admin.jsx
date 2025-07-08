import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className = "container mt-5">
      <h2>Wellcome Showmaker admin</h2>
      <hr />
      <Link to  = "/existing-rooms" className="btn btn-primary m-2">
        Manager Rooms
      </Link>
      <Link to  = "/existing-bookings" className="btn btn-primary m-2">
        Manager Bookings
      </Link>
    </section>
  )
}

export default Admin
