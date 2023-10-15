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
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Table(name = "usuario_cliente")
public class UserClient {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  @Getter
  @Setter
  private Long id;
  @Column(name = "usuario", nullable = false)
  @Getter
  @Setter
  private String user;
  @Column(name = "contrasena", nullable = false)
  @Getter
  @Setter
  private String password;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "cliente_id", referencedColumnName = "id")
  private Client client;

  public UserClient() {
  }

}