import { parseISO } from "date-fns"
import React, { useState, useEffect } from "react"
import DateSlider from "../common/DateSlider"

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
	const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

	const filterBooknigs = (startDate, endDate) => {
  let filtered = bookingInfo;
  if (startDate && endDate) {
    filtered = bookingInfo.filter((booking) => {
      // Chuyển số 2025517 thành Date object (giả sử định dạng YYYYMMDD)
      const parseCustomDate = (numDate) => {
        const dateStr = numDate.toString();
  
  // Xử lý số 7 chữ số (YYYYMDD)
  		const year = dateStr.substring(0, 4); // 2025
  		const month = dateStr.length === 7 
    	? dateStr.substring(4, 5) // Nếu 7 chữ số, tháng là 1 chữ số (5)
    	: dateStr.substring(4, 6); // Nếu 8 chữ số, tháng là 2 chữ số (05)
  		const day = dateStr.length === 7 
    	? dateStr.substring(5, 7) // Nếu 7 chữ số, ngày là 2 chữ số cuối (17)
    	: dateStr.substring(6, 8); // Nếu 8 chữ số, ngày là 2 chữ số cuối (17)
  
  		// Đảm bảo tháng có 2 chữ số (thêm '0' nếu cần)
  		const paddedMonth = month.padStart(2, '0');
  		const paddedDay = day.padStart(2, '0');
  
  		return new Date(`${year}-${paddedMonth}-${paddedDay}`);
      };

      const bookingStartDate = parseCustomDate(booking.checkInDate);
      const bookingEndDate = parseCustomDate(booking.checkOutDate);
	  // Thêm console.log để debug
		console.log("Parsed Start Date:", parseCustomDate(2025517));
		console.log("Parsed End Date:", parseCustomDate(2025529));

      return (
        bookingStartDate >= startDate &&
        bookingEndDate <= endDate &&
        bookingEndDate > startDate
      );
    });
  }
  setFilteredBookings(filtered);
};

	useEffect(() => {
		setFilteredBookings(bookingInfo)
	}, [bookingInfo])

	return (
		<section className="p-4">
			<DateSlider onDateChange={filterBooknigs} onFilterChange={filterBooknigs} />
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr>
						<th>S/N</th>
						<th>Booking ID</th>
						<th>Room ID</th>
						<th>Room Type</th>
						<th>Check-In Date</th>
						<th>Check-Out Date</th>
						<th>Guest Name</th>
						<th>Guest Email</th>
						<th>Adults</th>
						<th>Children</th>
						<th>Total Guest</th>
						<th>Confirmation Code</th>
						<th colSpan={2}>Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{filteredBookings.map((booking, index) => (
						<tr key={booking.id}>
							<td>{index + 1}</td>
							<td>{booking.id}</td>
							<td>{booking.room.id}</td>
							<td>{booking.room.roomType}</td>
							<td>{booking.checkInDate}</td>
							<td>{booking.checkOutDate}</td>
							<td>{booking.guestFullName}</td>
							<td>{booking.guestEmail}</td>
							<td>{booking.numOfAdults}</td>
							<td>{booking.numOfChildren}</td>
							<td>{booking.totalNumOfGuest}</td>
							<td>{booking.bookingConfirmationCode}</td>
							<td>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => handleBookingCancellation(booking.id)}>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{filterBooknigs.length === 0 && <p> No booking found for the selected dates</p>}
		</section>
	)
}

export default BookingsTable