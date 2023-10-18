package com.hotel.server.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "usuario_administrador")
public class UserManager {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "usuario", nullable = false, unique = true)
  private String user;

  @Column(name = "contrasena", nullable = false)
  private String password;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "administrador_id", referencedColumnName = "id")
  private Manager manager;

}
