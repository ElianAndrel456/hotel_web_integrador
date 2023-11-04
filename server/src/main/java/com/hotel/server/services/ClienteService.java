
package com.hotel.server.services;

import java.util.List;
import java.util.UUID;

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

  public Client getById(UUID id) {
    return ClientsRepository.findById(id).orElse(null);
  }

  public Client save(Client client) {
    return ClientsRepository.save(client);
  }

  public void delete(UUID id) {
    ClientsRepository.deleteById(id);
  }

  public Client update(UUID id, Client client) {
    Client clientToUpdate = ClientsRepository.findById(id).orElse(null);
    clientToUpdate.setName(client.getName());
    clientToUpdate.setLastname(client.getLastname());
    clientToUpdate.setType_of_document(client.getType_of_document());
    clientToUpdate.setNumber_of_document(client.getNumber_of_document());
    clientToUpdate.setEmail(client.getEmail());
    clientToUpdate.setPhone(client.getPhone());
    return ClientsRepository.save(clientToUpdate);
  }

}
