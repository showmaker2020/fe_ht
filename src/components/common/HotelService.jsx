import React from 'react'
import { Card, CardTitle, Col, Container, Row } from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa'
import RoomCard from '../room/RoomCard'

const HotelService = () => {
  return (
    <>
      <Container className = "mb-2">
        <Header title = {"Our Service"}/>

        <Row>
            <h4 className = "text-center">
                Service at <span className = "hotel-color"> lakeSide  - </span> Hotel
                <span className = "gap-2"><FaClock /> -24-Hour Front Desk</span>
            </h4>
        </Row>
        <hr />
        <Row xs = {1} md = {2} lg = {3} className = "g-4 mt-2">
            <Col>
                <Card>
                    <Card.Body>
                        <CardTitle className = "hotel-color">
                            <FaWifi /> Wifi
                        </CardTitle>
                        <Card.Text>
                            Stay connected with our high-speed internet access.
                        </Card.Text>
                    </Card.Body> 
                </Card>
            </Col>

            <Col>
                <Card>
                    <Card.Body>
                        <CardTitle className = "hotel-color">
                            <FaUtensils /> Breakfast
                        </CardTitle>
                        <Card.Text>
                            Start your day with a complimentary breakfast.
                        </Card.Text>
                    </Card.Body> 
                </Card>
            </Col>

            <Col>
                <Card>
                    <Card.Body>
                        <CardTitle className = "hotel-color">
                            <FaTshirt /> Laundry
                        </CardTitle>
                        <Card.Text>
                            Keep your clothes fresh with our laundry service.
                        </Card.Text>
                    </Card.Body> 
                </Card>
            </Col>

            <Col>
                <Card>
                    <Card.Body>
                        <CardTitle className = "hotel-color">
                            <FaCocktail /> Mini bar
                        </CardTitle>
                        <Card.Text>
                            Enjoy a refreshing drink or snack from our in-room mini bar.
                        </Card.Text>
                    </Card.Body> 
                </Card>
            </Col>

            <Col>
                <Card>
                    <Card.Body>
                        <CardTitle className = "hotel-color">
                            <FaParking /> Parking
                        </CardTitle>
                        <Card.Text>
                            Parking your car conveniently with our on-site parking facilities.
                        </Card.Text>
                    </Card.Body> 
                </Card>
            </Col>

            <Col>
                <Card>
                    <Card.Body>
                        <CardTitle className = "hotel-color">
                            <FaSnowflake /> Air Conditioning
                        </CardTitle>
                        <Card.Text>
                            Stay comfortable with our air-conditioned rooms.
                        </Card.Text>
                    </Card.Body> 
                </Card>
            </Col>

        </Row>
      </Container>
    </>
  )
}

export default HotelService
