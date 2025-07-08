import React, { useEffect } from 'react'
import { useState } from 'react';
import { getRoomById, updateRoom } from '../utils/ApiFunciton';
import { Link, useParams } from 'react-router-dom';

const EditRoom = () => {

  const [room, setRoom] = useState({
          photo: null,
          roomType: "",
          roomPrice: ""
      })
  
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {roomId} = useParams()

  const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setRoom({...room, photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
  }

  const handleInputChange = (event) => {
    const {name , value } = event.target;
    setRoom({...room, [name]: value});
  }

  useEffect(() => {
      const fetchRoom = async () => {
          try {
              const roomData = await getRoomById(roomId);
              setRoom(roomData);
              setImagePreview(roomData.photo);
          } catch (error) {
              console.error("Error fetching room data:", error);
          }
      }
      fetchRoom();
  }, [roomId]);

  const handleSubmit = async (event) => {
          event.preventDefault();
          try {
              const response = await updateRoom(roomId, room);
              if(response === 200) {
                  setSuccessMessage("Room updated successfully");
                  const updatedRoomData = await getRoomById(roomId);
                  setRoom(updatedRoomData);
                  setImagePreview(updatedRoomData.photo);
                  setErrorMessage("");
              }
              else {
                  setErrorMessage("Error updating room");
              }
          } catch (error) {
              setErrorMessage(error.message);
          }
  
          setTimeout(() => {
              setSuccessMessage("");
              setErrorMessage("");
          }, 3000);
      }
  return (
    <div className = "container mt-5 mb-5">
        <h3 className = "text-center mb-5 mt-5">Edit Room</h3>
        <div className = "row justify-content-center">
                <div className = "col-md-8 col-lg-6">
                    {successMessage && (
                        <div className = "alert alert-success fade show">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className = "alert alert-danger fade show">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit = {handleSubmit}>
                        <div className = "mb-3">
                            <label htmlFor = "roomType" className = "form-label">
                                Type
                            </label>
                            <input
                              type = "text"
                              className = "form-control"
                              id = "roomType"
                              name = "roomType"
                              value = {room.roomType}
                              onChange = {handleInputChange}>
                            </input>
                        </div>

                        <div className = "mb-3">
                            <label htmlFor = "roomPrice" className = "form-label">
                                Price
                            </label>
                            <input
                                type = "number"
                                className = "form-control"
                                id = "roomPrice"  
                                name = "roomPrice"
                                value = {room.roomPrice}
                                onChange = {handleInputChange}>
                            </input>
                        </div>

                        <div className = "mb-3">
                            <label htmlFor = "photo" className = "form-label">
                                Photo
                            </label>
                            <input
                              required
                                id ="photo"
                                name = "photo"
                                type = "file"
                                className = "form-control"
                                onChange = {handleImageChange}>
                            </input>
                            {imagePreview && (
                                <img src = {`data:image/jpeg;base64,${imagePreview}`}
                                alt = "Room Preview" 
                                style={{maxWidth: "400px", maxHeight: "400px"}}
                                className = "mb-3" />
                            )}
                        </div>
                        
                        <div className = "d-gird gap-2 d-md-flex mt-2">
                            <Link to = "/existing-rooms" className = "btn btn-outline-info ml-5">
                                Back
                            </Link>
                            <button type = "submit" className = "btn btn-outline-warning">
                                Edit Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default EditRoom
