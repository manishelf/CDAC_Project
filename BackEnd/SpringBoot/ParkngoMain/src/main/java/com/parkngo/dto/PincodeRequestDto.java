package com.parkngo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PincodeRequestDto {
    @NotNull(message = "Pincode cannot be null")
    private Long pincode;
}
