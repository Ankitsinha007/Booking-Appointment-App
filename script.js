// script.js

const apiUrl = 'https://crudcrud.com/api/9f4a04bbdec44657be9659a026890bdd/bookings'; // Replace with your server API URL
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
        console.log( error);
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
        console.log( error);
    }
}

async function deleteBooking(id){
    try {
            await axios.delete(`${apiUrl}/${id}`)

            fetchAndDisplayBookings();
    }
    catch (err){
        console.log(err);

    }
}

// function deleteBooking(id){
//     let getdetails = axios.get(apiUrl);
//     console.log(getdetails)

//     axios.delete(`${apiUrl}/${id}`)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// }

// async function deleteBooking(id) {
//     try {
//         // Send a delete request to the server
//         await axios.delete(`${apiUrl}/${id}`);

//         // Fetch and display updated appointments
//         const response = await axios.get(apiUrl);
//         // displayBookings(response.data);
//         fetchAndDisplayBookings();
//     } catch (error) {
//         console.log('Error deleting appointment:', error);
//     }
// }

function editBooking(id, newData) {
    // Assume you have a server endpoint for updating bookings
    // Use axios.put to send updated data to the server

    axios.put(`/api/bookings/${id}`, newData)
        .then(response => {
            // Handle success
            console.log('Booking updated successfully');
            // You can update the UI or do other things after successful update
        })
        .catch(error => {
            // Handle error
            console.error('Error updating booking', error);
        });
}

// Fetch and display initial bookings on page load
fetchAndDisplayBookings();
