import React, { useState, useEffect } from 'react';
import { getRoomTypes } from '../utils/ApiFunciton';

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState("");

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        })
    }, []);

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = (e) => {
        if(newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypeInput(false);
        }
    }
  return (
    <>
      {roomTypes.length > 0 && (
        <div>
        <select 
        id = "roomType"
        name = "roomType"
        value = {newRoom.roomType}
        onChange = {(e) => {
            if(e.target.value === "Add New") {
                setShowNewRoomTypeInput(true);
            } else {
                handleRoomInputChange(e);
            }
        }}>

        <option value = {""} style={{ fontStyle: 'italic' }}>Select a room type</option>
        <option value = {"Add New"} style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Add New </option>
        {roomTypes.map((type, index) => (
            <option key = {index} value = {type}>
                {type}
            </option>
        ))}
        </select>

        {showNewRoomTypeInput && (
            <div className = "input-group">
                <input 
                className = "form-control"
                type = "text"
                onChange = {handleNewRoomTypeInputChange}
                placeholder = "Enter new room type"
                />
                <button className = "btn btn-hotel" type = "button" 
                    onClick = {handleAddNewRoomType}>
                    Add
                </button>
            </div>
        )}
        </div>
      )}
    </>
  )
}

export default RoomTypeSelector
