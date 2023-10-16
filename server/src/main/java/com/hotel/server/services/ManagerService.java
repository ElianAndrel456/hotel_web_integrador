package com.hotel.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.server.dao.ManagerRepository;
import com.hotel.server.models.Manager;

@Service
public class ManagerService {
  @Autowired
  private ManagerRepository managerRepository;

  public List<Manager> getAllManagers() {
    return managerRepository.findAll();
  }

  public Manager getManagerById(Long id) {
    return managerRepository.findById(id).orElse(null);
  }

  public Manager createManager(Manager manager) {
    return managerRepository.save(manager);
  }

}
