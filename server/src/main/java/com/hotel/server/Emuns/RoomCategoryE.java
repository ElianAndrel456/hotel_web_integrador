package com.hotel.server.Emuns;

public enum RoomCategoryE {
  DIAMANTE("Diamante"), ORO("Oro"), PLATA("Plata");

  private String category;

  private RoomCategoryE(String category) {
    this.category = category;
  }

  public String getCategory() {
    return category;
  }
}
