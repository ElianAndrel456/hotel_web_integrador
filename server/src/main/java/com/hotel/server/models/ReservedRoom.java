package com.hotel.server.models;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.hotel.server.Emuns.ReservationStateE;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "reserva_habitacion")
public class ReservedRoom {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private UUID id;

  @Column(name = "fecha_entrada", nullable = false)
  private Date dateIn;

  @Column(name = "fecha_salida", nullable = false)
  private Date dateOut;

  @Column(name = "numero_personas", nullable = false)
  private Integer numberPeople;

  @Column(name = "estado_reserva", nullable = false)
  private ReservationStateE reservationState;

  @Column(name = "total", nullable = false)
  private Double total;

  @OneToOne
  @JoinColumn(name = "habitacion_id", referencedColumnName = "id")
  private Room room;

  @OneToOne
  @JoinColumn(name = "cliente_id", referencedColumnName = "id")
  private Client client;

  @OneToOne
  @JoinColumn(name = "usuario_cliente_id", referencedColumnName = "id")
  private Manager manager;

  @OneToMany(cascade = CascadeType.PERSIST)
  @JoinTable(name = "reserva_servicios_adicionales", joinColumns = @JoinColumn(name = "reserva_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "servicios_adicionales_id", referencedColumnName = "id"))
  private List<AditionalServices> aditionalServices;

}
