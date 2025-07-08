import React, { useEffect } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunciton';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import BookingSummary from './BookingSummary';
import {Form, Card, Row, Col } from 'react-bootstrap';

const BookingForm = () => {
    const [isValidated, setIsValidated] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [errorMessage , setErrorMessage] = React.useState("");
    const [roomPrice, setRoomPrice] = React.useState(0);
    const currentUser = localStorage.getItem("userId");
    const [booking, setBooking] = React.useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
    });
    const [roomInfo, setRoomInfo] = React.useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    });

    const {roomId} = useParams();
    const navigate = useNavigate();

    const handelInputChange = (e) => {
        const {name , value} = e.target;
        setBooking({...booking, [name]: value});
        setErrorMessage("");
    }

    const getRoomPriceById = async (roomId) => {
        try {
           const response = await getRoomById(roomId);
           setRoomPrice(response.roomPrice);
        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId]);

    const calculateTotalPrice = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diff = checkOutDate.diff(checkInDate, 'days');
        const price = roomPrice ? roomPrice : 0;
        return diff*price;
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults);
        const childCount = parseInt(booking.numOfChildren);
        const totalCount = adultCount + childCount;
        return totalCount >= 1 && adultCount >= 1;
    }

    const isCheckOutDataValid = () => {
        if(!moment(booking.checkOutDate) .isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must be after check-in date");
            return false;
        } else {
            setErrorMessage("");
            return true;
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        if(form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDataValid()) {
            e.stopPropagation();
        } else {
            setIsSubmitted(true);
        }
        setIsValidated(true);
    }

    const handleBooking = async() => {
        try {
            const confirmation = await bookRoom(roomId, booking);
            setIsSubmitted(true);
            navigate("/booking-success", {state: {message: confirmation}});
        } catch (error) {
            setErrorMessage(error.message)
            navigate("/booking-success", {state: {error: errorMessage}});
        }
    }

  return (
        <div className="container mb-5">
            <h2 className="text-center mb-4"></h2>
            <Row>
                <Col md={6}>
                    <Card className="p-4    ">
                        <Form noValidate validated={isValidated} onSubmit={handelSubmit}>
                            <h4 className="mb-4">Personal Information</h4>
                            
                            <Form.Group className="mb-2">
                                <Form.Label><strong>Full Name</strong></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    id = "guestFullName"
                                    name="guestFullName"
                                    value={booking.guestFullName}
                                    placeholder="Enter your full name"
                                    onChange={handelInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your full name.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label><strong>Email</strong></Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    name="gusetEmail"
                                    value={booking.gusetEmail}
                                    placeholder="Enter your email"
                                    onChange={handelInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <h4 className="mt-3 mb-3">Lodging Period</h4>
                            
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label><strong>Check-in Date</strong></Form.Label>
                                        <Form.Control
                                            required
                                            type="date"
                                            name="checkInDate"
                                            value={booking.checkInDate}
                                            onChange={handelInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label><strong>Check-out Date</strong></Form.Label>
                                        <Form.Control
                                            required
                                            type="date"
                                            name="checkOutDate"
                                            value={booking.checkOutDate}
                                            onChange={handelInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {errorMessage && <p className="text-danger">{errorMessage}</p>}

                            <h4 className="mt-3 mb-3">Number of Guest</h4>
                            
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label><strong>Adults</strong></Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name="numOfAdults"
                                            value={booking.numOfAdults}
                                            min={1}
                                            onChange={handelInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label><strong>Children</strong></Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="numOfChildren"
                                            value={booking.numOfChildren}
                                            min={0}
                                            onChange={handelInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="d-grid mt-4">
                                <button className="btn btn-primary" type="submit">
                                    Continue
                                </button>
                            </div>
                        </Form>
                    </Card>
                </Col>

                <Col md={6}>
                    {isSubmitted && (
                        <BookingSummary 
                            booking={booking}
                            payment={calculateTotalPrice()}
                            isFormValid={isValidated}
                            onConfirm={handleBooking}
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default BookingForm
