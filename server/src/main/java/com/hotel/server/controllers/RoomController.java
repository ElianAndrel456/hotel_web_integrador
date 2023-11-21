package com.hotel.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import com.hotel.server.models.Room;
import com.hotel.server.services.RoomService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

  @Autowired
  private RoomService roomService;

  @GetMapping
  public ResponseEntity<List<Room>> findAll() {
    try {
      return roomService.findAllRooms();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping
  public ResponseEntity<Room> save(@Valid @RequestBody Room room) {
    try {
      return roomService.createRoom(room);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }

  }

  @PutMapping("/{id}")
  public ResponseEntity<Room> update(@PathVariable UUID id, @Valid @RequestBody Room room) {
    try {
      return roomService.updateByIdRoom(id, room);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
    try {
      return roomService.deleteByIdRoom(id);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }

  }

}
