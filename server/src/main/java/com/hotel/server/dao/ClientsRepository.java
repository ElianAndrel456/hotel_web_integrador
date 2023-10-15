package com.hotel.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.Client;

public interface ClientsRepository extends JpaRepository<Client, Long> {

}
