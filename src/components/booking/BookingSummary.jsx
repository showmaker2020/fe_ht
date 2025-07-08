import moment from 'moment'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numOfDay = checkOutDate.diff(checkInDate, 'days')
    const [isBookingConfirmed, setIsBookingConfirmed] = React.useState(false)
    const [isProcessPayment, setIsProcessPayment] = React.useState(false)

    const navigate = useNavigate()

    const handleConfirmBooking = () => {
        setIsBookingConfirmed(true)
        setTimeout(() => {
            setIsProcessPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000)
    }

    useEffect(()=> {
        if(isBookingConfirmed){
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])


  return (
    <div className = "card card-body mt-5">
        <h4>Reservation Summary</h4>
        <p>
            FullName:<strong>{booking.guestFullName} </strong>
        </p>
        <p>
            Email: <strong>{booking.gusetEmail}</strong>
        </p>
        <p>
            CheckIn Date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
        </p>
        <p>
            CheckOut Date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
        </p>
        <p>
            Number of Days: <strong>{numOfDay}</strong>
        </p>

        <div>
            <h5 className="hotel-color">Number of Guest</h5>
					<strong>
						Adult{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}
					</strong>
					<strong>
						<p>Children : {booking.numOfChildren}</p>
				</strong>
        </div>

        {payment > 0 ? (
            <>
                <p>
                    Total Price: <strong>${payment}</strong>
                </p>
                {isFormValid && !isBookingConfirmed ? (
                    <button 
                        className="btn btn-success"
                        style={{ borderRadius: '2px' }}
                        onClick={handleConfirmBooking}
                        disabled={isProcessPayment}>
                        {isProcessPayment ? (
                            <>
                                <span
                                className = "spinner-border spinner-border-sm mr-2"
                                role = "status"
                                aria-hidden = "true">
                                </span>
                                Booking Confirmed, redirecting to payment...
                            </>
                        ): (
                            "Confirm Booking and Proceed to Payment"
                        )}
                    </button>
                ) : isBookingConfirmed ? (
                    <div className = "d-flex justify-content-center align-items-center">
                        <div className = "spinner-border text-success" role = "status">
                            <span className = "sr-only">Loading...</span>
                        </div>

                    </div>
                ) : null }
            </>
        ) : (
            <p className = "text-danger">
                Check-out date must be after check-in date and at least one guest must be selected.
            </p>
        )}
    </div>
  )
}

export default BookingSummary
