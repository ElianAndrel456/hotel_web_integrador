package com.hotel.server.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hotel.server.models.Reserved;

public interface ReservedRepository extends JpaRepository<Reserved, UUID> {

  @Query("SELECT r FROM Reserved r WHERE r.client.id = :clientId")
  List<Reserved> findAllReservdsByClientId(@Param("clientId") UUID clientId);

  @Query("SELECT r FROM Reserved r WHERE r.room.id = :roomId")
  List<Reserved> findAllReservedsByRoomId(@Param("roomId") UUID roomId);
}
