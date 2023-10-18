package com.hotel.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.Manager;
import com.hotel.server.models.UserManager;

public interface UserManagerRepository extends JpaRepository<UserManager, Long> {
  UserManager findByUserAndPassword(String user, String password);
}
