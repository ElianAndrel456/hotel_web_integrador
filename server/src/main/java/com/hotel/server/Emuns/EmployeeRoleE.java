package com.hotel.server.Emuns;

public enum EmployeeRoleE {
  ADMINISTRADOR("Administrador"), RECEPCIONISTA("Recepcionista"), LIMPIEZA("Limpieza");

  private String role;

  private EmployeeRoleE(String role) {
    this.role = role;
  }

  public String getRole() {
    return role;
  }

}
