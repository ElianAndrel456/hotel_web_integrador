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

import com.hotel.server.models.Additional;
import com.hotel.server.services.AdditionalService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/additionals")
public class AdditionalController {
  @Autowired
  private AdditionalService additionalService;

  @GetMapping
  public ResponseEntity<List<Additional>> findAll() {
    try {
      return additionalService.findAllAdditionals();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  @PostMapping
  public ResponseEntity<Additional> save(@Valid @RequestBody Additional additional) {
    try {
      return additionalService.createAdditional(additional);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Additional> update(@PathVariable UUID id, @Valid @RequestBody Additional additional) {
    try {
      return additionalService.updateByIdAdditional(id, additional);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
    try {
      return additionalService.deleteByIdAdditional(id);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

}
