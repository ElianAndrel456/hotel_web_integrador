package com.hotel.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.server.models.Client;
import com.hotel.server.services.ClienteService;

@RestController
public class ClientController {

  @Autowired
  private ClienteService clientService;

  @GetMapping("/api/clientes")
  public List<Client> getAllClients() {
    try {
      return clientService.getAll();
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @GetMapping("/api/clientes/{id}")
  public Client getByIdClient(@PathVariable Long id) {
    try {
      return clientService.getById(id);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @PostMapping("/api/clientes")
  public Client saveClient(@RequestBody Client client) {
    try {
      return clientService.save(client);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

}
