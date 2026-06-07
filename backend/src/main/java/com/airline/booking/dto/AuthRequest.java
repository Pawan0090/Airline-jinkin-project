package com.airline.booking.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String fullName; // Only needed for registration
    private String email;
    private String password;
}
