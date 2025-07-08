import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
         "Accept": "application/json"   
	}
}


// func: addRoom
export async function addRoom(photo, roomType, roomPrice) {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("roomType", roomType);
        formData.append("roomPrice", roomPrice);

        const response = await api.post('/rooms/add/new-room', formData);
        if(response.status === 200) {
            return true;
        } else {
            return false;
        }
   
}


// Func: get all Room Types
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching room types", error);
    }

}


// func: get all rooms
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching all rooms", error);
    }
}

// func: delete room
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`);
        return result.data;
    } catch (error) {
        throw new Error("Error deleting room", error);
    }
}


// func: update room
export async function updateRoom(roomId, roomData){
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    if (roomData.photo instanceof File || roomData.photo instanceof Blob) {
    formData.append("photo", roomData.photo);
  } else if (typeof roomData.photo === 'string') {
    // Nếu là base64, chuyển thành Blob
    const blob = await fetch(roomData.photo).then(r => r.blob());
    formData.append("photo", blob, 'room-photo.jpg');
  }

  const response = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.status;
}


// func: get room by id
export async function getRoomById(roomId){
    try {
        const respone = await api.get(`/rooms/room/${roomId}`);
        return respone.data;
    } catch (error) {
        throw new Error("Error fetching room by ID", error);
    }
}

export async function bookRoom(rooId, booking){
    try {
        const respone = await api.post(`bookings/room/${rooId}/booking`, booking);
        return respone.data;
    } catch (error) {
        throw error.response && error.response.data 
        ? new Error(error.response.data.message) 
        : new Error("Error booking room", error);
    }
}

export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}


export async function getBookingByConfirmation(confirmation){
    try {
        const result = await api.get(`/bookings/confirmation/${confirmation}`);
        return result.data;
    } catch (error) {
        throw error.response && error.response.data 
        ? new Error(error.response.data.message) 
        : new Error("Error find booking", error);
    }
}

export async function  cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
        return result.data;
    } catch (error) {
        throw new Error("Error deleting booking", error);
    }
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}


export async function registerUser(registrantion){
    try {
        const response = await api.post("/auth/register-user", registrantion);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        } else {
            throw new Error("User registrantion error", error.message);
        }
    }
}

export async function loginUser(login){
    try {
        const response = await api.post("auth/login", login);
        if(response.status >= 200 && response.status < 300){
            return response.data;
        }
    } catch (error){
        console.error("Login error:", error);
        return null;
    }
}


export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}


export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}


export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}


export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}