package com.hotel.server.models;

import com.hotel.server.Emuns.TypeDoc;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
@Table(name = "cliente")
public class Client {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "tipo_documento", nullable = false)
  private TypeDoc tipoDocumento;

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

}
