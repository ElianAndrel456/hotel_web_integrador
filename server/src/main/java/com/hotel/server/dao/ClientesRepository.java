package com.hotel.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.Cliente;

public interface ClientesRepository extends JpaRepository<Cliente, Long> {

}
