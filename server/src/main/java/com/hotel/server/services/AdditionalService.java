package com.hotel.server.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hotel.server.models.Additional;
import com.hotel.server.repository.AdditionalRepository;

@Service
public class AdditionalService {

  @Autowired
  private AdditionalRepository additionalRepository;

  public ResponseEntity<List<Additional>> findAllAdditionals() {
    try {
      List<Additional> additionals = additionalRepository.findAll();
      return ResponseEntity.ok(additionals);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Additional> createAdditional(Additional additional) {
    try {
      System.out.println(additional);
      Additional newAdditional = additionalRepository.save(additional);
      return ResponseEntity.ok(newAdditional);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Additional> findByIdAdditional(UUID id) {
    try {
      Additional newAdditional = additionalRepository.findById(id).orElseThrow();
      return ResponseEntity.ok(newAdditional);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Additional> updateByIdAdditional(UUID id, Additional additional) {
    try {
      Additional findAdditional = additionalRepository.findById(id).orElseThrow();
      if (findAdditional == null)
        throw new Exception("Additional not found");
      Additional additionalSaved = additionalRepository.save(additional);
      return ResponseEntity.ok(additionalSaved);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Void> deleteByIdAdditional(UUID id) {
    try {
      additionalRepository.deleteById(id);
      return ResponseEntity.status(204).build();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

}
