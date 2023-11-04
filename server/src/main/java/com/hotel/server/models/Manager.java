package com.hotel.server.models;

import java.util.UUID;

import com.hotel.server.Emuns.MangerRolE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "administrador")
public class Manager {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "nombre", nullable = false)
  private String name;

  @Column(name = "apellido", nullable = false)
  private String lastName;

  @Column(name = "correo", nullable = false, unique = true)
  private String email;

  @Column(name = "telefono", nullable = false)
  private String phone;

  @Column(name = "rol", nullable = false)
  private MangerRolE rol;

}
