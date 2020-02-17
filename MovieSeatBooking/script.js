const container = document.querySelector(".container"); //Selects one element
const seats = document.querySelectorAll(".row .seat:not(.occupied)"); //selects all elements with given parameter
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value; //The plus sign makes it a number instead of a string

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); //Since theres only 1 return we dont need return statement and curly braces
  //Spread operator[...]. copies elements of an array. Map is similar to forEach but returns an array

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //Need to wrap in json.stringify since we are saving an array
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); //parsing the json string we created earlier

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie Select Event

movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat Click event
container.addEventListener("click", e => {
  //Arrow function
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied") //validating a seat is clicked and that it isnt an occupied seat
  ) {
    e.target.classList.toggle("selected"); //Toggles selected class onto seat

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
