import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RoomCard = ({ room }) => {
  return (
    <Col key={room.id} className="mb-4" xs={12}>
      <Card className="shadow-sm">
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">

            <Link 
              to={`/book-room/${room.id}`} 
              className="btn btn-danger btn-lg px-4"
              style={{ borderRadius: "2rem" }}
            >
            <Card.Img
              variant="top"
              src={`data:image/png;base64,${room.photo}`}
              alt="Room Photo"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />

            </Link> 
          </div>

          <div className="flex-grow-1 ml-3 px-3">
            <Card.Title className="font-weight-bold mb-3" style={{ fontSize: "1.5rem" }}>
              {room.roomType}
            </Card.Title>
            <Card.Subtitle className="mb-3 text-danger" style={{ fontSize: "1.25rem" }}>
              ${room.roomPrice} / night
            </Card.Subtitle>
            <Card.Text className="text-muted mb-4">
              Some room information goes here for the guest to read through
            </Card.Text>
          </div>
          
          <div className="flex-shrink-0 text-center text-md-right">
            <Link 
              to={`/book-room/${room.id}`} 
              className="btn btn-danger btn-lg px-4"
              style={{ borderRadius: "2rem" }}
            >
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default RoomCard