import React, { useEffect } from 'react'
import BookingForm from './BookingForm'
import RoomCarousel from '../common/RoomCarousel';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoomById } from '../utils/ApiFunciton';
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlass } from 'react-icons/fa';

const Checkout = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: ""
  });
  const {roomId} = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
      .then((response) =>{
        setRoomInfo(response)
        setIsLoading(false);
      }).catch((error) => {
        setError(error);
      })
    }, 2000)
  }, [roomId])

  return (
    <div>
      <section className="container">
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-4 mb-4">
            {isLoading ? (
              <p>Loading room information</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="room-info">
                <img
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  alt="Room Photo"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <table className="table mt-3">
                  <tbody>
                    <tr>
                      <td><strong>Room Type:</strong></td>
                      <td>{roomInfo.roomType}</td>
                    </tr>
                    <tr>
                      <td><strong>Price per night:</strong></td>
                      <td>${roomInfo.roomPrice}</td>
                    </tr>
                    <tr>
                      <td><strong>Room Service:</strong></td>
                      <td>
                        <ul className="list-unstyled">
                          <li><FaWifi className="me-2" /> Wifi</li>
                          <li><FaTv className="me-2" /> Netflix Premium</li>
                          <li><FaUtensils className="me-2" /> Breakfast</li>
                          <li><FaWineGlass className="me-2" /> Mini bar refreshment</li>
                          <li><FaCar className="me-2" /> Car Service</li>
                          <li><FaParking className="me-2" /> Parking Space</li>
                          <li><FaTshirt className="me-2" /> Laundry</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <BookingForm />
          </div>
        </div>
      </section>
      <div className="container"> 
        <RoomCarousel />
      </div>
    </div>
  )
}

export default Checkout