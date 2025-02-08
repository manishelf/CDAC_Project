package com.parkngo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequestDto {
    @NotBlank(message = "Address cannot be empty")
    private String address;
}
