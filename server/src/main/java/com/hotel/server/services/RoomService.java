package com.hotel.server.services;

import java.util.List;
import java.util.UUID;

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

  public Room getRoomById(UUID id) {
    return roomRepository.findById(id).orElse(null);
  }

  public Room saveRoom(Room room) {

    return roomRepository.save(room);
  }

  public void deleteRoom(UUID id) {
    roomRepository.deleteById(id);
  }

  public Room updateRoom(UUID id, Room room) {
    Room existingRoom = roomRepository.findById(id).orElse(null);
    existingRoom.setState(room.getState());
    existingRoom.setFloor(room.getFloor());
    existingRoom.setCategoryRoom(room.getCategoryRoom());
    return roomRepository.save(existingRoom);
  }
}
