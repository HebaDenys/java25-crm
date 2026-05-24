package dev.javacrm.crm.lead;

public record StageCount(LeadStage stage, String label, long count) {
}