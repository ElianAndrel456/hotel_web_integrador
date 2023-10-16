package com.hotel.server.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "categoria_habitacion")
public class CategoryRoom {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "nombre", nullable = false)
  private String name;

  @Column(name = "descripcion", nullable = true)
  private String description;

  @Column(name = "precio", nullable = false)
  private Double price;

}
