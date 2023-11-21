// script.js

const apiUrl = 'https://crudcrud.com/api/c96d8b026eba467691c86b5cc4208e36/bookings'; // Replace with your server API URL
const bookingForm = document.getElementById('bookingForm');
const bookingList = document.getElementById('bookingList');

// Function to submit a booking
async function submitBooking() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    try {
        // Send data to the server
        const response = await axios.post(apiUrl, { name, email, phone });

        // Clear the form
        bookingForm.reset();

        // Fetch and display updated bookings
        fetchAndDisplayBookings();
    } catch (error) {
        console.error('Error submitting booking:', error);
    }
}

// Function to display bookings
function displayBookings(bookings) {
    bookingList.innerHTML = '';

    bookings.forEach(booking => {
        // Create a div for each booking
        const bookingDiv = document.createElement('div');
        bookingDiv.classList.add('booking');

        // Display data
        bookingDiv.innerHTML = `
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <button onclick="editBooking(${booking.id})">Edit</button>
            <button onclick="deleteBooking(${booking.id})">Delete</button>
        `;

        console.log(booking)

        // Append to the booking list
        bookingList.appendChild(bookingDiv);
    });
}

// Function to fetch and display bookings
async function fetchAndDisplayBookings() {
    try {
        const response = await axios.get(apiUrl);
        displayBookings(response.data);
    } catch (error) {
        console.error('Error fetching bookings:', error);
    }
}

// async function deleteBooking(id){
//     try {
//             await axios.delete(`${apiUrl}/${id}`)

//             fetchAndDisplayBookings();
//     }
//     catch (err){
//         console.log(err);

//     }
// }

function deleteBooking(id){
    // let confirmation = window.confirm("Are you sure?");

    axios
    .delete(`https://crudcrud.com/api/c96d8b026eba467691c86b5cc4208e36/bookings/${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

    fetchAndDisplayBookings();
}

// Fetch and display initial bookings on page load
fetchAndDisplayBookings();
