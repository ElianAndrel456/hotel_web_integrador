package com.hotel.server.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.Client;

public interface ClientRepository extends JpaRepository<Client, UUID> {

  Client findByEmail(String email);

}
