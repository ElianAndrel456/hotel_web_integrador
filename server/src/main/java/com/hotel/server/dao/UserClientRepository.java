package com.hotel.server.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.UserClient;

public interface UserClientRepository extends JpaRepository<UserClient, UUID> {

  UserClient findByUserAndPassword(String user, String password);

}
