package com.parkngo.dto;

import java.util.Map;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MailRequestDto {
	@NotEmpty
    String recipients;
    
	@NotEmpty
    String templateName;
    
    Map<String, String> entries;
}
