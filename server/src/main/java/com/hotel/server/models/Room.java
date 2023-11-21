package com.hotel.server.models;

import java.util.UUID;

import com.hotel.server.Emuns.RoomCategoryE;
import com.hotel.server.Emuns.RoomStateE;
import com.hotel.server.Emuns.RoomTypeE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "habitaciones")
public class Room {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id")
  private UUID id;

  @NotNull
  @NotBlank
  @Size(min = 2, max = 3)
  @Pattern(regexp = "^[0-9]{3}$")
  @Column(name = "numero_habitacion", nullable = false, unique = true)
  private String numberRoom;

  @NotNull
  @Column(name = "categoria_habitacion", nullable = false)
  private RoomCategoryE categoryRoom;

  @NotNull
  @Column(name = "tipo_habitacion", nullable = false)
  private RoomTypeE typeRoom;

  @NotNull
  @Positive
  @DecimalMax(value = "999999.99")
  @Column(name = "precio", nullable = false)
  private Double price;

  @NotNull
  @Column(name = "estado", nullable = false)
  private RoomStateE State;

}
