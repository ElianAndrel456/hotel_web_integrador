package com.hotel.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.UserClient;

public interface UserClientRepository extends JpaRepository<UserClient, Long> {

  UserClient findByUserAndPassword(String user, String password);

}
