package dev.javacrm.crm.lead;

import java.math.BigDecimal;
import java.util.List;

public record CrmOverview(
        long totalLeads,
        BigDecimal pipelineValue,
        List<StageCount> pipeline,
        List<LeadResponse> recentLeads) {
}