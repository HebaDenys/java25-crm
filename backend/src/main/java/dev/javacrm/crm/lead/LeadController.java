package dev.javacrm.crm.lead;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LeadController {
    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "service", "java25-crm-api");
    }

    @GetMapping("/leads")
    public List<LeadResponse> listLeads() {
        return leadService.listLeads();
    }

    @PostMapping("/leads")
    @ResponseStatus(HttpStatus.CREATED)
    public LeadResponse createLead(@Valid @RequestBody CreateLeadRequest request) {
        return leadService.createLead(request);
    }

    @GetMapping("/overview")
    public CrmOverview overview() {
        return leadService.overview();
    }
}