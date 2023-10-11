package com.hotel.server.models;

import com.hotel.server.Emuns.TipoDoc;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cliente")
public class Cliente {
  @Id
  @Column(name = "id", nullable = false)
  private Long id;
  @Column(name = "tipo_documento", nullable = false)
  private TipoDoc tipoDocumento;
  @Column(name = "numero_documento", nullable = false)
  private String numeroDocumento;
  @Column(name = "nombre", nullable = false)
  private String nombre;
  @Column(name = "apellido", nullable = false)
  private String apellido;
  @Column(name = "correo", nullable = false, unique = true)
  private String correo;
  @Column(name = "telefono", nullable = false)
  private String telefono;

  public Cliente() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public TipoDoc getTipoDocumento() {
    return tipoDocumento;
  }

  public void setTipoDocumento(TipoDoc tipoDocumento) {
    this.tipoDocumento = tipoDocumento;
  }

  public String getNumeroDocumento() {
    return numeroDocumento;
  }

  public void setNumeroDocumento(String numeroDocumento) {
    this.numeroDocumento = numeroDocumento;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getApellido() {
    return apellido;
  }

  public void setApellido(String apellido) {
    this.apellido = apellido;
  }

  public String getCorreo() {
    return correo;
  }

  public void setCorreo(String correo) {
    this.correo = correo;
  }

  public String getTelefono() {
    return telefono;
  }

  public void setTelefono(String telefono) {
    this.telefono = telefono;
  }
}
