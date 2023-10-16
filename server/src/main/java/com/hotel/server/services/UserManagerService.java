package com.hotel.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.server.dao.UserManagerRepository;
import com.hotel.server.models.UserManager;

@Service
public class UserManagerService {

  @Autowired
  private UserManagerRepository userManagerRepository;

  public List<UserManager> getAllUserManagers() {
    return userManagerRepository.findAll();
  }

  public UserManager getUserManagerById(Long id) {
    return userManagerRepository.findById(id).orElse(null);
  }

  public UserManager createUserManager(UserManager userManager) {
    return userManagerRepository.save(userManager);
  }

}
