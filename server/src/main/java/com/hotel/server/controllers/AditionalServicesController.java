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

import com.hotel.server.models.AditionalServices;
import com.hotel.server.services.AditionalServicesService;

@RestController
@RequestMapping("/api/aditional_services")
public class AditionalServicesController {

  @Autowired
  private AditionalServicesService aditionalServicesService;

  @GetMapping
  public List<AditionalServices> getAditionalServices() {
    try {

      return aditionalServicesService.getAllAditionalServices();

    } catch (Exception e) {

      System.err.println(e.getMessage());
      return null;
    }
  }

  @GetMapping("/{id}")
  public AditionalServices getAditionalServicesById(@PathVariable UUID id) {
    try {

      return aditionalServicesService.getAditionalServicesById(id);

    } catch (Exception e) {

      System.err.println(e.getMessage());
      return null;
    }
  }

  @PostMapping("/create")
  public AditionalServices createAditionalServices(@RequestBody AditionalServices aditionalServices) {
    try {

      return aditionalServicesService.saveAditionalServices(aditionalServices);

    } catch (Exception e) {

      System.err.println(e.getMessage());
      return null;
    }
  }

  @PutMapping("/update/{id}")
  public AditionalServices updateAditionalServices(@PathVariable UUID id,
      @RequestBody AditionalServices aditionalServices) {
    try {

      return aditionalServicesService.updateAditionalServices(id, aditionalServices);

    } catch (Exception e) {

      System.err.println(e.getMessage());
      return null;
    }
  }

  @DeleteMapping("/delete/{id}")
  public void deleteAditionalServices(@PathVariable UUID id) {
    try {

      aditionalServicesService.deleteAditionalServices(id);

    } catch (Exception e) {

      System.err.println(e.getMessage());
    }
  }

}
