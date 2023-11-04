package com.hotel.server.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.server.models.ReservedRoom;
import com.hotel.server.services.ReservedRoomService;

@RestController
@RequestMapping("/api/reservacion")
public class ReservedRoomController {
  @Autowired
  private ReservedRoomService reservedRoomService;

  @GetMapping
  public List<ReservedRoom> getAllReservedRooms() {
    try {
      return reservedRoomService.getAllReservedRooms();
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @GetMapping("/{id}")
  public ReservedRoom getReservedRoomById(@PathVariable UUID id) {
    try {
      return reservedRoomService.getReservedRoomById(id);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @PostMapping("/create")
  public ReservedRoom createReservedRoom(@RequestBody ReservedRoom reservedRoom) {
    try {
      System.out.println(reservedRoom);
      return reservedRoomService.saveReservedRoom(reservedRoom);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @PutMapping("/{id}")
  public ReservedRoom updateReservedRoom(@PathVariable UUID id, @RequestBody ReservedRoom reservedRoom) {
    try {
      return reservedRoomService.UpdateReservedRoom(reservedRoom);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @DeleteMapping("/{id}")
  public void deleteReservedRoom(@PathVariable UUID id) {
    try {
      reservedRoomService.deleteReservedRoom(id);
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }

  }

}
