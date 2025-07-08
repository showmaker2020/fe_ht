import React from 'react'
import { Container } from 'react-bootstrap'

const Parallax = () => {
  return (
    <div className = "parallax mb-5">
        <Container className = "text-center px-5 justify-content-center">
            <div className = "animated-texts boundary">
                <h1>Wellcome to <span className = "hotel-color"> lakeSide Hotel</span></h1>
                <h3>We offer the best services for all your need</h3>
            </div>
        </Container>
    </div>
  )
}

export default Parallax
