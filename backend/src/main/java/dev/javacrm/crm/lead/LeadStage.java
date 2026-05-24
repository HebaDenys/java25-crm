package dev.javacrm.crm.lead;

public enum LeadStage {
    NEW("New"),
    QUALIFIED("Qualified"),
    PROPOSAL("Proposal"),
    NEGOTIATION("Negotiation"),
    WON("Won"),
    LOST("Lost");

    private final String label;

    LeadStage(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }
}