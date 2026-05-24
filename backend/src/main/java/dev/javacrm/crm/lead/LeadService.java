package dev.javacrm.crm.lead;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeadService {
    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @Transactional(readOnly = true)
    public List<LeadResponse> listLeads() {
        return leadRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(LeadResponse::from)
                .toList();
    }

    @Transactional
    public LeadResponse createLead(CreateLeadRequest request) {
        var lead = new Lead(
                request.contactName(),
                request.companyName(),
                request.email(),
                request.stage(),
                request.estimatedValue(),
                request.ownerName(),
                request.nextAction(),
                request.nextActionDate());

        return LeadResponse.from(leadRepository.save(lead));
    }

    @Transactional(readOnly = true)
    public CrmOverview overview() {
        var leads = leadRepository.findAllByOrderByCreatedAtDesc();
        var countsByStage = leads.stream()
                .collect(Collectors.groupingBy(Lead::stage, Collectors.counting()));
        var pipeline = Arrays.stream(LeadStage.values())
                .map(stage -> new StageCount(stage, stage.label(), countsByStage.getOrDefault(stage, 0L)))
                .toList();
        var pipelineValue = leads.stream()
                .filter(lead -> lead.stage() != LeadStage.LOST)
                .map(Lead::estimatedValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        var recentLeads = leads.stream()
                .limit(5)
                .map(LeadResponse::from)
                .toList();

        return new CrmOverview(leads.size(), pipelineValue, pipeline, recentLeads);
    }
}