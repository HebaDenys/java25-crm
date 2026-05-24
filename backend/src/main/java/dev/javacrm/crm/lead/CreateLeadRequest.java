package dev.javacrm.crm.lead;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateLeadRequest(
        @NotBlank String contactName,
        @NotBlank String companyName,
        @Email String email,
        @NotNull LeadStage stage,
        @NotNull @PositiveOrZero BigDecimal estimatedValue,
        @NotBlank String ownerName,
        @NotBlank String nextAction,
        LocalDate nextActionDate) {
}