package com.hotel.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.server.dao.RoomRepository;
import com.hotel.server.models.Room;

@Service
public class RoomService {
  @Autowired
  private RoomRepository roomRepository;

  public List<Room> getAllRooms() {
    return roomRepository.findAll();
  }

  public Room getRoomById(Long id) {
    return roomRepository.findById(id).orElse(null);
  }

  public Room saveRoom(Room room) {
    return roomRepository.save(room);
  }

}
