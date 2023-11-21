package com.hotel.server.models;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "clientes")
public class Client {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id")
  private UUID id;

  @NotNull
  @NotBlank
  @Size(min = 3, max = 50)
  @Column(name = "nombres", nullable = false)
  private String names;

  @NotNull
  @Email
  @Column(name = "correo", nullable = false, unique = true)
  private String email;

  @NotNull
  @NotBlank
  @Pattern(regexp = "^[0-9]{9}$")
  @Column(name = "telefono", nullable = false)
  private String phone;

  @NotNull
  @NotBlank
  @Size(min = 3, max = 200)
  @Column(name = "direccion", nullable = false)
  private String address;

  @NotNull
  @Pattern(regexp = "^[0-9]{8}$")
  @Column(name = "dni", nullable = false, unique = true)
  private String dni;

  @NotNull
  @NotBlank
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")
  @Column(name = "contrasena", nullable = false)
  private String password;

  @Column(name = "codigo", nullable = true)
  private String code;

  @Column(name = "verificado", nullable = false)
  private Boolean isVerified;

}
