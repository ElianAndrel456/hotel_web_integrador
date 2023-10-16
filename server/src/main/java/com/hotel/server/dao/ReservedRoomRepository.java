package com.hotel.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.ReservedRoom;

public interface ReservedRoomRepository extends JpaRepository<ReservedRoom, Long> {

}
