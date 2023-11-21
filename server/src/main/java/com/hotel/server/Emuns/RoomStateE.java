package com.hotel.server.Emuns;

public enum RoomStateE {
  DISPONIBLE("Disponible"), RESERVADO("Reservado"), MANTENIMIENTO("Mantenimiento");

  private String state;

  private RoomStateE(String state) {
    this.state = state;
  }

  public String getState() {
    return state;
  }
}
