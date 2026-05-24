package dev.javacrm.crm.lead;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

public record LeadResponse(
        UUID id,
        String contactName,
        String companyName,
        String email,
        LeadStage stage,
        String stageLabel,
        BigDecimal estimatedValue,
        String ownerName,
        String nextAction,
        LocalDate nextActionDate,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt) {
    static LeadResponse from(Lead lead) {
        return new LeadResponse(
                lead.id(),
                lead.contactName(),
                lead.companyName(),
                lead.email(),
                lead.stage(),
                lead.stage().label(),
                lead.estimatedValue(),
                lead.ownerName(),
                lead.nextAction(),
                lead.nextActionDate(),
                lead.createdAt(),
                lead.updatedAt());
    }
}