package com.hotel.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.server.models.Client;
import com.hotel.server.models.UserClient;
import com.hotel.server.responses.RequestBodyClient;
import com.hotel.server.services.ClienteService;
import com.hotel.server.services.UserClientService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class ClientController {

  @Autowired
  private ClienteService clientService;
  @Autowired
  private UserClientService userClientService;

  @GetMapping("/api/get_all_clients")
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

  @PostMapping("/api/clientes/create")
  public Client saveClient(@RequestBody RequestBodyClient requestBodyClient) {
    try {
      System.out.println(requestBodyClient);

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

  @PostMapping("/api/clientes/auth")
  public UserClient authentication(@RequestBody UserClient userClient, HttpServletResponse response) {
    try {

      UserClient findUser = userClientService.getUserClientByUsernameAndPassword(userClient.getUser(),
          userClient.getPassword());

      if (findUser == null)
        throw new Exception("Usuario o contraseña incorrectos");

      Cookie cookie = new Cookie("h_w_username", findUser.getUser());

      cookie.setMaxAge(3600);
      cookie.setPath("/");
      Cookie cookie2 = new Cookie("h_w_id", findUser.getId().toString());
      cookie2.setMaxAge(3600);
      cookie2.setPath("/");

      response.addCookie(cookie);
      response.addCookie(cookie2);

      findUser.setPassword(null);

      return findUser;
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

}
