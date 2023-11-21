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

import com.hotel.server.models.Client;
import com.hotel.server.services.ClientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

  @Autowired
  private ClientService clientService;

  @GetMapping
  public ResponseEntity<List<Client>> findAll() {
    try {
      return clientService.findAllClients();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping
  public ResponseEntity<Client> save(@Valid @RequestBody Client client) {
    try {
      client.setCode(null);
      client.setIsVerified(true);

      return clientService.createClient(client);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }

  }

  @PutMapping("/{id}")
  public ResponseEntity<Client> update(@PathVariable UUID id, @RequestBody Client client) {
    try {
      return clientService.updateByIdClient(id, client);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
    try {
      return clientService.deleteByIdClient(id);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }

  }

}
