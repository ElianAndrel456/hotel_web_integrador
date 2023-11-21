package com.hotel.server.Emuns;

public enum RoomTypeE {
  INDIVIDUAL("Sencilla"), DOBLE("Doble"), SUITE("Suite");

  private String type;

  private RoomTypeE(String type) {
    this.type = type;
  }

  public String getType() {
    return type;
  }
}
