package com.hotel.server.models;

import com.hotel.server.Emuns.RoomState;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
  private RoomState state;

  @ManyToOne
  @JoinColumn(name = "categoria_habitacion_id", referencedColumnName = "id")
  private CategoryRoom categoryRoom;

}
