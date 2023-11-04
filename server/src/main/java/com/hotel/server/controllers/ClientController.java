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

import com.hotel.server.models.Client;
import com.hotel.server.models.UserClient;
import com.hotel.server.responses.RequestBodyClient;
import com.hotel.server.services.ClienteService;
import com.hotel.server.services.UserClientService;

@RestController
@RequestMapping("/api/cliente")
public class ClientController {

  @Autowired
  private ClienteService clientService;
  @Autowired
  private UserClientService userClientService;

  @GetMapping
  public List<Client> getAllClients() {
    try {
      return clientService.getAll();
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @GetMapping("/{id}")
  public Client getByIdClient(@PathVariable UUID id) {
    try {
      return clientService.getById(id);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @PostMapping("/create")
  public Client saveClient(@RequestBody RequestBodyClient requestBodyClient) {
    try {

      Client client = new Client();
      client.setName(requestBodyClient.getName());
      client.setLastname(requestBodyClient.getLastname());
      client.setType_of_document(requestBodyClient.getType_of_document());
      client.setNumber_of_document(requestBodyClient.getNumber_of_document());
      client.setEmail(requestBodyClient.getEmail());
      client.setPhone(requestBodyClient.getPhone());
      Client newClient = clientService.save(client);

      UserClient userClient = new UserClient();

      userClient.setClient(
          clientService.getById(newClient.getId())

      );

      userClient.setUser(requestBodyClient.getUsername());
      userClient.setPassword(requestBodyClient.getPassword());

      userClientService.saveUserClient(userClient);

      return newClient;
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @DeleteMapping("/{id}")
  public boolean deleteClient(@PathVariable UUID id) {
    try {
      clientService.delete(id);
      return true;
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return false;
    }
  }

  @PutMapping("/{id}")
  public Client updateClient(@PathVariable UUID id, @RequestBody Client client) {
    try {
      return clientService.update(id, client);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

}
