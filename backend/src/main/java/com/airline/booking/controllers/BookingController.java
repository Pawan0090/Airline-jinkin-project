package com.airline.booking.controllers;

import com.airline.booking.models.Booking;
import com.airline.booking.models.Flight;
import com.airline.booking.models.User;
import com.airline.booking.repositories.BookingRepository;
import com.airline.booking.repositories.FlightRepository;
import com.airline.booking.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/my-bookings")
    public ResponseEntity<?> getUserBookings(@RequestParam String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<Booking> userBookings = bookingRepository.findByUserId(userOpt.get().getId());
        return ResponseEntity.ok(userBookings);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestParam String email, @RequestParam Long flightId, @RequestParam int passengers) {
        
        Optional<User> userOpt = userRepository.findByEmail(email);
        Optional<Flight> flightOpt = flightRepository.findById(flightId);

        if (userOpt.isEmpty() || flightOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid User or Flight");
        }

        Flight flight = flightOpt.get();
        if (flight.getAvailableSeats() < passengers) {
            return ResponseEntity.badRequest().body("Not enough seats available");
        }

        // Deduct seats and save flight
        flight.setAvailableSeats(flight.getAvailableSeats() - passengers);
        flightRepository.save(flight);

        // Create booking
        Booking booking = new Booking();
        booking.setUser(userOpt.get());
        booking.setFlight(flight);
        booking.setStatus("CONFIRMED");
        booking.setPassengersCount(passengers);
        booking.setBookingDate(LocalDateTime.now());

        bookingRepository.save(booking);

        return ResponseEntity.ok("Booking confirmed! Booking ID: " + booking.getId());
    }
}
