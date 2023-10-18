package com.hotel.server.models;

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
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "piso", nullable = false)
  private int floor;

  @Column(name = "estado", nullable = false)
  private RoomStateE state;

  @Column(name = "categoria")
  private CategoryRoomE categoryRoom;

}
