package com.hotel.server.models;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.hotel.server.Emuns.ReservedStateE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "reservas")
public class Reserved {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id")
  private UUID id;

  @Column(name = "fecha_reserva", nullable = false)
  private Date dateReserved;

  @NotNull(message = "dateEntry is required")
  @Column(name = "fecha_ingreso", nullable = false)
  private Date dateEntry;

  @Future(message = "dateDeparture must be a future date")
  @NotNull(message = "dateDeparture is required")
  @Column(name = "fecha_salida", nullable = false)
  private Date dateDeparture;

  @NotNull(message = "state is required")
  @Column(name = "estado", nullable = false)
  private ReservedStateE state;

  @Column(name = "total", nullable = false)
  private Double total;

  @ManyToOne
  @JoinColumn(name = "cliente_id", nullable = true)
  private Client client;

  @ManyToOne
  @JoinColumn(name = "room_id", nullable = true)
  private Room room;

  @ManyToMany
  @JoinTable(name = "servicios_reservados", joinColumns = @JoinColumn(name = "reserva_id", nullable = true), inverseJoinColumns = @JoinColumn(name = "servicio_id"))
  private List<Additional> services;

}
