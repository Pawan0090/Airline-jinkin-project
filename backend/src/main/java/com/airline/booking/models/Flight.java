package com.airline.booking.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "flights")
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String airline;
    private String origin;
    private String destination;
    private LocalDateTime departureTime;
    private double price;
    private int availableSeats;
}
