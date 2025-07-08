import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../utils/ApiFunciton';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([{id: "", roomType: "", roomPrice: "", photo: ""}]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        getAllRooms().then((data) =>{
            setRooms(data);
            setIsLoading(false);
        }).catch((error) => {
            setErrorMessage(error.message);
            setIsLoading(false);
        })
    }, []);

    if(isLoading) {
        return <div className="mt-5">Loading...</div>;
    }
    if(errorMessage) {
        return <div className="mt-5 mb-5 text-danger">{errorMessage}</div>;
    }
  return (
    <section className = "bg-light mb-5 mt-5 shadow">
        <Link to = "/browse-all-rooms" className = "hotel-color text-center">
            Browse All Rooms
        </Link>
        <Container>
            <Carousel indicators={false}>
                {[...Array(Math.ceil(rooms.length /4))].map((_,index) =>(
                    <Carousel.Item key={index}>
                        <Row>
                            {rooms.slice(index *4, index*4+4).map((room)=>
                                <Col key = {room.id} className = "mb-4" xs = {12} md = {6} lg = {3}>
                                    <Card>
                                        <Link to = {`/book-room/${room.id}`}>
                                            <Card.Img 
                                                variant="top"
                                                src = {`data:image/jpeg;base64,${room.photo}`}
                                                alt = "Room Photo"
                                                className = "w-100"
                                                style={{height: "200px"}}>

                                            </Card.Img>
                                        </Link>

                                        <Card.Body>
                                            <Card.Title className="font-weight-bold mb-3" style={{ fontSize: "1.5rem" }}>
                                                {room.roomType}
                                            </Card.Title>
                                            <Card.Subtitle className="mb-3 text-danger" style={{ fontSize: "1.25rem" }}>
                                                ${room.roomPrice} / night
                                            </Card.Subtitle>
                                            <div className="flex-shrink-0 text-center text-md-right">
                                                <Link 
                                                    to={`/book-room/${room.id}`} 
                                                    className="btn btn-danger btn-sm"
                                                    style={{ borderRadius: "2rem" }}
                                                    >
                                                    Book Now
                                                </Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    </section>
  )
}

export default RoomCarousel
