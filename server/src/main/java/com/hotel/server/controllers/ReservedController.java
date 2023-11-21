package com.hotel.server.controllers;

import java.util.List;
import java.util.UUID;

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

import com.hotel.server.models.Reserved;
import com.hotel.server.services.ReservedService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reserveds")
public class ReservedController {

  @Autowired
  private ReservedService reservedService;

  @GetMapping
  public ResponseEntity<List<Reserved>> findAll() {
    try {
      return reservedService.findAllReserved();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping
  public ResponseEntity<Reserved> save(@Valid @RequestBody Reserved reserved) {
    try {
      return reservedService.createReserved(reserved);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }

  }

  @PutMapping("/{id}")
  public ResponseEntity<Reserved> update(@PathVariable UUID id, @Valid @RequestBody Reserved reserved) {
    try {
      return reservedService.updateByIdReserved(id, reserved);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
    try {
      return reservedService.deleteByIdReserved(id);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }

  }

}
