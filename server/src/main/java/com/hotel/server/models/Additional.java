package com.hotel.server.models;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "servicios")
public class Additional {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id")
  private UUID id;

  @NotNull(message = "name is required")
  @NotBlank
  @Size(min = 2, max = 40)
  @Column(name = "nombre", nullable = false)
  private String name;

  @NotNull(message = "description is required")
  @NotBlank
  @Size(min = 3, max = 200)
  @Column(name = "descripcion", nullable = false)
  private String description;

  @NotNull(message = "price is required")
  @Positive(message = "price must be greater than 0")
  @DecimalMax(value = "999999.99")
  @Column(name = "precio", nullable = false)
  private double price;

  @NotNull(message = "isAvailable is required")
  @Column(name = "disponibilidad", nullable = false)
  private boolean isAvailable;

}
