package com.hotel.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

}
