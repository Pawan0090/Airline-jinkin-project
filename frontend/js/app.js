document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.innerHTML = '<p>Searching...</p>';

    fetch(`http://localhost:8080/api/flights/search?origin=${origin}&destination=${destination}`)
        .then(response => response.json())
        .then(data => {
            if(data.length === 0) {
                resultsDiv.innerHTML = '<div class="alert alert-warning">No flights found for this route.</div>';
                return;
            }
            
            let html = '<h4 class="mt-3">Available Flights</h4><ul class="list-group text-dark">';
            data.forEach(flight => {
                html += `<li class="list-group-item d-flex justify-content-between align-items-center">
                            <strong>${flight.airline}</strong> | ${flight.origin} to ${flight.destination}
                            <span class="badge bg-primary rounded-pill">$${flight.price}</span>
                         </li>`;
            });
            html += '</ul>';
            resultsDiv.innerHTML = html;
        })
        .catch(error => {
            resultsDiv.innerHTML = '<div class="alert alert-danger">Error connecting to server. Is backend running?</div>';
            console.error('Error:', error);
        });
        // ... inside your searchForm event listener ...
            let html = '<h4 class="mt-3">Available Flights</h4><ul class="list-group text-dark">';
            data.forEach(flight => {
                html += `<li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${flight.airline}</strong><br>
                                <small>${flight.origin} to ${flight.destination} | Seats Left: ${flight.availableSeats}</small>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="badge bg-primary rounded-pill fs-6 me-3">$${flight.price}</span>
                                <button class="btn btn-success btn-sm fw-bold" onclick="bookFlight(${flight.id})">Book Now</button>
                            </div>
                         </li>`;
            });
            html += '</ul>';
            resultsDiv.innerHTML = html;
// ... end of searchForm listener ...


// Add this new function to the bottom of app.js
function bookFlight(flightId) {
    const token = localStorage.getItem('jwt_token');
    const userEmail = localStorage.getItem('user_email');

    if (!token || !userEmail) {
        alert("Please log in to book a flight.");
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }

    // Defaulting to 1 passenger for now
    const passengers = 1; 

    fetch(`http://localhost:8080/api/bookings/create?email=${userEmail}&flightId=${flightId}&passengers=${passengers}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}` // This proves the user is authenticated!
        }
    })
    .then(async response => {
        const text = await response.text();
        if (!response.ok) throw new Error(text);
        
        alert("Success! " + text);
        // Refresh the search to show updated seat counts
        document.getElementById('searchForm').dispatchEvent(new Event('submit'));
    })
    .catch(error => {
        alert("Booking failed: " + error.message);
    });
}
        // --- Authentication Logic ---

document.addEventListener("DOMContentLoaded", () => {
    checkAuthState();
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginAlert = document.getElementById('loginAlert');
    const submitBtn = this.querySelector('button[type="submit"]');

    // Reset alert and loading state
    loginAlert.classList.add('d-none');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...';
    submitBtn.disabled = true;

    // Send payload to Spring Boot Backend
    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(async response => {
        const data = await response.json().catch(() => null); // Handle potential non-JSON errors
        
        if (!response.ok) {
            throw new Error(data ? data.message : 'Invalid email or password');
        }
        return data;
    })
    .then(data => {
        // Success: Store the JWT Token and User Info
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user_name', data.name);
        localStorage.setItem('user_email', data.email);

        // Close Modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();

        // Update UI
        checkAuthState();
        
        // Reset form
        document.getElementById('loginForm').reset();
    })
    .catch(error => {
        // Error: Show alert
        loginAlert.textContent = error.message;
        loginAlert.classList.remove('d-none');
    })
    .finally(() => {
        // Reset button state
        submitBtn.innerHTML = 'Login';
        submitBtn.disabled = false;
    });
});

// --- UI State Management ---

function checkAuthState() {
    const token = localStorage.getItem('jwt_token');
    const userName = localStorage.getItem('user_name');
    const authButtonsContainer = document.querySelector('.navbar .d-flex');

    if (token && userName) {
        // User is logged in: Swap Login button for User Profile/Logout
        authButtonsContainer.innerHTML = `
            <span class="navbar-text text-white me-3 fw-bold">Hello, ${userName}</span>
            <button class="btn btn-outline-danger" onclick="logout()">Logout</button>
        `;
    } else {
        // User is logged out: Show Login button
        authButtonsContainer.innerHTML = `
            <button class="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
        `;
    }
}

function logout() {
    // Clear tokens and update UI
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    checkAuthState();
}
});
