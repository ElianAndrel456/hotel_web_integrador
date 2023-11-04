package com.hotel.server.controllers;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.server.models.Manager;
import com.hotel.server.models.UserManager;
import com.hotel.server.responses.RequestBodyManager;
import com.hotel.server.services.ManagerService;
import com.hotel.server.services.UserManagerService;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

  @Autowired
  private ManagerService managerService;

  @Autowired
  private UserManagerService userManagerService;

  @GetMapping
  public List<Manager> getAllManagers() {
    try {
      return managerService.getAllManagers();
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @GetMapping("/{id}")
  public Manager getManagerById(@PathVariable UUID id) {
    try {
      return managerService.getManagerById(id);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  @PostMapping
  public Manager createManager(@RequestBody RequestBodyManager requestBodyManager) {
    try {
      Manager manager = new Manager();
      manager.setName(requestBodyManager.getName());
      manager.setEmail(requestBodyManager.getEmail());
      manager.setLastName(requestBodyManager.getLastName());
      manager.setPhone(requestBodyManager.getPhone());
      manager.setRol(requestBodyManager.getRol());
      Manager newManager = managerService.createManager(manager);

      UserManager userManager = new UserManager();

      if (newManager.getId() == null)
        throw new Exception("Error al crear el usuario");

      userManager.setManager(
          managerService.getManagerById(newManager.getId()));
      userManager.setUser(requestBodyManager.getUsername());
      userManager.setPassword(requestBodyManager.getPassword());

      userManagerService.createUserManager(userManager);

      return manager;

    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

}
