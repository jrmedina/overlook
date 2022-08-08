function fetchData(dataset) {
  return fetch(`http://localhost:3001/api/v1/${dataset}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .catch((error) => console.log(`ERROR: ${error}`));
}

function addBooking(bookingData) {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  })
    .then((booking) => {
      if (booking.ok) {
        return booking.json();
      } else {
        throw Error(booking.status.Text);
      }
    })
    .catch((error) => console.log(error));
}

function deleteBooking(id) {
  return fetch(`http://localhost:3001/api/v1/bookings${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  })
    .then((booking) => {
      if (booking.ok) {
        return booking.json();
      } else {
        throw Error(booking.status.Text);
      }
    })
    .catch((error) => console.log(error));
}

let allData = Promise.all([
  fetchData("customers"),
  fetchData("rooms"),
  fetchData("bookings"),
  addBooking,
  deleteBooking,
]);

export { allData, addBooking };
