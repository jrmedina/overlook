function fetchData(dataset) {
  return fetch(`http://localhost:3001/api/v1/${dataset}`)
    .then((response) => {
      console.log(response)
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .catch((error) => console.log(`ERROR: ${error}`));
}

let allData = Promise.all([
  fetchData("customers"),
  fetchData("rooms"),
  fetchData("bookings"),
]);

export { allData };
