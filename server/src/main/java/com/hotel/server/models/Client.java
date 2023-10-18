package com.hotel.server.models;

import com.hotel.server.Emuns.TypeDocE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "cliente")
public class Client {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "tipo_documento", nullable = false)
  private TypeDocE type_of_document;// --> 0 -> DNI 1 -> PASAPORTE 2-> CARNET DE EXTRANJERIA

  @Column(name = "numero_documento", nullable = false)
  private String number_of_document;

  @Column(name = "nombre", nullable = false)
  private String name;

  @Column(name = "apellido", nullable = false)
  private String lastname;

  @Column(name = "correo", nullable = false, unique = true)
  private String email;

  @Column(name = "telefono", nullable = false)
  private String phone;

}
