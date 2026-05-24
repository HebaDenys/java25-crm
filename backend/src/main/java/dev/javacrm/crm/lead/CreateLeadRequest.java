package dev.javacrm.crm.lead;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateLeadRequest(
        @NotBlank(message = "Contact name is required") String contactName,
        @NotBlank(message = "Company name is required") String companyName,
        @Email(message = "Email must be valid") String email,
        @NotNull(message = "Stage is required") LeadStage stage,
        @NotNull(message = "Estimated value is required") @PositiveOrZero(message = "Estimated value must be zero or greater") BigDecimal estimatedValue,
        @NotBlank(message = "Owner name is required") String ownerName,
        @NotBlank(message = "Next action is required") String nextAction,
        LocalDate nextActionDate) {
}