package com.parkngo.dto;

import java.util.Map;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MailRequestDto {	
	@NotEmpty
    String recipients;
    
	@NotEmpty
    String templateName;
    
    Map<String, String> entries;

	public MailRequestDto(@NotEmpty String recipients, @NotEmpty String templateName, Map<String, String> entries) {
		super();
		this.recipients = recipients;
		this.templateName = templateName;
		this.entries = entries;
	}

}
