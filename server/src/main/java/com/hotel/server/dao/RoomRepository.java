package com.hotel.server.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.Room;

public interface RoomRepository extends JpaRepository<Room, UUID> {

}
