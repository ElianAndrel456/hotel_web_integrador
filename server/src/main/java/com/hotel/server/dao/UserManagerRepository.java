package com.hotel.server.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.UserManager;

public interface UserManagerRepository extends JpaRepository<UserManager, UUID> {
  UserManager findByUserAndPassword(String user, String password);
}
