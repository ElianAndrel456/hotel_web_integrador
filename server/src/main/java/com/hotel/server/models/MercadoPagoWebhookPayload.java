package com.hotel.server.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class MercadoPagoWebhookPayload {
  private String action;

  @JsonProperty("api_version")
  private String apiVersion;

  @JsonProperty("application_id")
  private String applicationId;

  @JsonProperty("date_created")
  private String dateCreated;

  private String id;

  @JsonProperty("live_mode")
  private String liveMode;

  private String type;

  @JsonProperty("user_id")
  private long userId;

  private Data data;

  // Getters and setters

  public static class Data {
    private String id;

    public String getId() {
      return id;
    }

    public void setId(String id) {
      this.id = id;
    }

    // Getters and setters
  }
}
