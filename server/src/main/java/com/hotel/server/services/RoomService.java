package com.hotel.server.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hotel.server.models.Reserved;
import com.hotel.server.models.Room;
import com.hotel.server.repository.ReservedRepository;
import com.hotel.server.repository.RoomRepository;

@Service
public class RoomService {
  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private ReservedRepository reservedRepository;

  public ResponseEntity<List<Room>> findAllRooms() {
    try {
      List<Room> rooms = roomRepository.findAll();
      return ResponseEntity.ok(rooms);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Room> createRoom(Room room) {
    try {
      Room roomSaved = roomRepository.save(room);
      return ResponseEntity.created(null).body(roomSaved);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Room> findByIdRoom(UUID id) {
    try {
      Room room = roomRepository.findById(id).orElseThrow();
      return ResponseEntity.ok(room);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Void> deleteByIdRoom(UUID id) {
    try {
      List<Reserved> reserveds = reservedRepository.findAllReservedsByRoomId(id);

      if (reserveds.size() > 0) {
        for (Reserved reserved : reserveds) {
          reserved.setRoom(null);
          reservedRepository.save(reserved);
        }
      }

      roomRepository.deleteById(id);
      return ResponseEntity.status(204).build();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Room> updateByIdRoom(UUID id, Room room) {
    try {
      Room roomSaved = roomRepository.findById(id).orElseThrow();
      if (roomSaved == null)
        return ResponseEntity.notFound().build();

      Room returnRoom = new Room();
      returnRoom.setId(id);
      returnRoom.setNumberRoom(room.getNumberRoom());
      returnRoom.setCategoryRoom(room.getCategoryRoom());
      Room roomUpdated = roomRepository.save(room);
      return ResponseEntity.ok(roomUpdated);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }
}
