package com.hotel.server.Emuns;

public enum ReservedStateE {
  PENDIENTE("Pendiente"), CONFIMADO("Confirmada"), CANCELADO("Cancelada"), FINALIZADO("Finalizada"),
  EXPIRADO("Expirada");

  private String state;

  private ReservedStateE(String state) {
    this.state = state;
  }

  public String getState() {
    return state;
  }
}