package com.airline.booking.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*") // Update in prod
public class FlightController {

    // Inject FlightService here via constructor

    @GetMapping("/search")
    public ResponseEntity<?> searchFlights(
            @RequestParam String origin, 
            @RequestParam String destination, 
            @RequestParam String date) {
        // Implementation logic to fetch from database
        return ResponseEntity.ok("Flight search results for " + origin + " to " + destination);
    }
}
