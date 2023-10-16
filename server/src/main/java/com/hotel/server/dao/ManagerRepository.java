package com.hotel.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.Manager;

public interface ManagerRepository extends JpaRepository<Manager, Long> {

}
