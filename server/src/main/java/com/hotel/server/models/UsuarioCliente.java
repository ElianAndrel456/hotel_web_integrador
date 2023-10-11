package com.hotel.server.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario_cliente")
public class UsuarioCliente {
  @Id
  @Column(name = "id", nullable = false)
  private Long id;
  @Column(name = "usuario", nullable = false)
  private String usuario;
  @Column(name = "contrasena", nullable = false)
  private String contrasena;

  public UsuarioCliente() {
  }

}