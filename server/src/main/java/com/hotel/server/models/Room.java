package com.hotel.server.models;

import java.util.UUID;

import com.hotel.server.Emuns.CategoryRoomE;
import com.hotel.server.Emuns.RoomStateE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "habitacion")
public class Room {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private UUID id;

  @Column(name = "piso", nullable = false)
  private int floor;

  @Column(name = "estado", nullable = false)
  private RoomStateE state; // --> DISPONIBLE, OCUPADO, MANTENIMIENTO

  @Column(name = "categoria")
  private CategoryRoomE categoryRoom; // --> PLATA, ORO, DIAMANTE

}
