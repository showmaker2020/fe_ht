import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
        <section className = "container mt-5">
            <h2>404 Not Found</h2>
            <hr />
            <Link to  = "/" className="btn btn-primary m-2">
                Back to Home
            </Link>
        </section>
    </div>
  )
}

export default ErrorPage
