package dev.javacrm.crm.lead;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
                "spring.datasource.url=jdbc:h2:mem:java25_crm_test;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DEFAULT_NULL_ORDERING=HIGH;DB_CLOSE_DELAY=-1",
                "spring.datasource.driver-class-name=org.h2.Driver",
                "spring.datasource.username=sa",
                "spring.datasource.password=",
                "spring.flyway.enabled=false",
                "spring.jpa.hibernate.ddl-auto=create-drop"
})
@AutoConfigureMockMvc
class LeadControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
        void createsLeadAndReportsOverview() throws Exception {
        mockMvc.perform(get("/api/overview"))
                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.totalLeads").value(0))
                .andExpect(jsonPath("$.pipeline", hasSize(6)))
                                .andExpect(jsonPath("$.recentLeads", hasSize(0)));

        var payload = """
                {
                  "contactName": "Priya Shah",
                  "companyName": "Cobalt Systems",
                  "email": "priya.shah@cobalt.example",
                  "stage": "QUALIFIED",
                  "estimatedValue": 31500,
                  "ownerName": "Sales Team",
                  "nextAction": "Confirm technical stakeholders",
                  "nextActionDate": "2026-06-01"
                }
                """;

        mockMvc.perform(post("/api/leads")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.contactName").value("Priya Shah"))
                .andExpect(jsonPath("$.companyName").value("Cobalt Systems"))
                .andExpect(jsonPath("$.stage").value("QUALIFIED"));

        mockMvc.perform(get("/api/overview"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalLeads").value(1));
    }

    @Test
    void rejectsInvalidLeadRequestsWithProblemDetails() throws Exception {
        mockMvc.perform(post("/api/leads")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation failed"))
                .andExpect(jsonPath("$.errors").isArray());
    }
}