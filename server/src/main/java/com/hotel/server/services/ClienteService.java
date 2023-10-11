package com.hotel.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.server.dao.ClientesRepository;
import com.hotel.server.models.Cliente;

@Service
public class ClienteService {
  @Autowired
  private ClientesRepository clientesRepository;

  public List<Cliente> getAll() {
    return clientesRepository.findAll();
  }

}
