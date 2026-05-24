package dev.javacrm.crm.lead;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "leads")
public class Lead {
    @Id
    private UUID id;

    @Column(name = "contact_name", nullable = false, length = 160)
    private String contactName;

    @Column(name = "company_name", nullable = false, length = 160)
    private String companyName;

    @Column(length = 200)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private LeadStage stage;

    @Column(name = "estimated_value", nullable = false, precision = 12, scale = 2)
    private BigDecimal estimatedValue;

    @Column(name = "owner_name", nullable = false, length = 120)
    private String ownerName;

    @Column(name = "next_action", nullable = false, length = 240)
    private String nextAction;

    @Column(name = "next_action_date")
    private LocalDate nextActionDate;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    protected Lead() {
    }

    public Lead(String contactName, String companyName, String email, LeadStage stage, BigDecimal estimatedValue,
            String ownerName, String nextAction, LocalDate nextActionDate) {
        this.contactName = contactName;
        this.companyName = companyName;
        this.email = email;
        this.stage = stage;
        this.estimatedValue = estimatedValue;
        this.ownerName = ownerName;
        this.nextAction = nextAction;
        this.nextActionDate = nextActionDate;
    }

    @PrePersist
    void createTimestamps() {
        var now = OffsetDateTime.now();
        if (id == null) {
            id = UUID.randomUUID();
        }
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void updateTimestamp() {
        updatedAt = OffsetDateTime.now();
    }

    public UUID id() {
        return id;
    }

    public String contactName() {
        return contactName;
    }

    public String companyName() {
        return companyName;
    }

    public String email() {
        return email;
    }

    public LeadStage stage() {
        return stage;
    }

    public BigDecimal estimatedValue() {
        return estimatedValue;
    }

    public String ownerName() {
        return ownerName;
    }

    public String nextAction() {
        return nextAction;
    }

    public LocalDate nextActionDate() {
        return nextActionDate;
    }

    public OffsetDateTime createdAt() {
        return createdAt;
    }

    public OffsetDateTime updatedAt() {
        return updatedAt;
    }
}