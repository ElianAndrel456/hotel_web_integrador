package com.hotel.server.models;

import com.hotel.server.Emuns.MangerRol;

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
@Table(name = "administrador")
public class Manager {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nombre", nullable = false)
  private String name;

  @Column(name = "apellido", nullable = false)
  private String lastName;

  @Column(name = "correo", nullable = false, unique = true)
  private String email;

  @Column(name = "contrasena", nullable = false)
  private String phone;

  @Column(name = "rol", nullable = false)
  private MangerRol rol;

}