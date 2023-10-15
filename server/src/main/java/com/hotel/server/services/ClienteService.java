
package com.hotel.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.server.dao.ClientsRepository;
import com.hotel.server.models.Client;

@Service
public class ClienteService {

  @Autowired
  private ClientsRepository ClientsRepository;

  public List<Client> getAll() {
    return ClientsRepository.findAll();
  }

  public Client getById(Long id) {
    return ClientsRepository.findById(id).orElse(null);
  }

  public Client save(Client client) {
    return ClientsRepository.save(client);
  }

  public void delete(Long id) {
    ClientsRepository.deleteById(id);
  }

}
