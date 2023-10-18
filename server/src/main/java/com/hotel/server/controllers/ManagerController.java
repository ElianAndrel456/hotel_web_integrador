package com.hotel.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.server.models.Manager;
import com.hotel.server.services.ManagerService;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

  @Autowired
  private ManagerService managerService;

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
  public Manager getManagerById(@PathVariable Long id) {
    try {
      return managerService.getManagerById(id);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

}
