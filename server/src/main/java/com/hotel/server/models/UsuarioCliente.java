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

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsuario() {
    return usuario;
  }

  public void setUsuario(String usuario) {
    this.usuario = usuario;
  }

  public String getContrasena() {
    return contrasena;
  }

  public void setContrasena(String contrasena) {
    this.contrasena = contrasena;
  }

}