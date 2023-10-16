package com.hotel.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.server.dao.UserClientRepository;
import com.hotel.server.models.UserClient;

@Service
public class UserClientService {
  @Autowired
  private UserClientRepository userClientRepository;

  public List<UserClient> getAllUserClients() {
    return userClientRepository.findAll();
  }

  public UserClient getUserClientById(Long id) {
    return userClientRepository.findById(id).orElse(null);
  }

  public UserClient getUserClientByUsernameAndPassword(String username, String password) {
    return userClientRepository.findByUserAndPassword(username, password);

  }

  public UserClient saveUserClient(UserClient userClient) {
    return userClientRepository.save(userClient);
  }

}
