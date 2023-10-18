package com.hotel.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.server.models.Room;
import com.hotel.server.services.RoomService;

@RestController
@RequestMapping("/api/habitacion")
public class RoomController {
  @Autowired
  private RoomService roomService;

  @GetMapping
  public List<Room> getAllRooms() {
    try {
      return roomService.getAllRooms();
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @GetMapping("/{id}")
  public Room getByIdRoom(@PathVariable Long id) {
    try {
      return roomService.getRoomById(id);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @PostMapping("/create")
  public Room saveRoom(Room room) {
    try {
      return roomService.saveRoom(room);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @DeleteMapping("/delete/{id}")
  public void deleteRoom(@PathVariable Long id) {
    try {
      roomService.deleteRoom(id);
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }

  }

}
