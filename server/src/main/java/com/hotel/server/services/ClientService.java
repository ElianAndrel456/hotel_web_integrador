package com.hotel.server.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hotel.server.models.Client;
import com.hotel.server.models.Employee;
import com.hotel.server.models.Reserved;
import com.hotel.server.repository.ClientRepository;

@Service
public class ClientService {
  @Autowired
  private ClientRepository clientRepository;

  @Autowired
  private ReservedService reservedService;

  @Autowired
  private EmployeeService employeeService;

  public ResponseEntity<List<Client>> findAllClients() {
    try {
      List<Client> clients = clientRepository.findAll();

      return ResponseEntity.ok(clients);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Client> findByEmailClient(String email) {
    try {
      Client client = clientRepository.findByEmail(email);
      return ResponseEntity.ok(client);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Client> createClient(Client client) {
    try {
      Employee findEmployee = employeeService.findByEmailEmployee(client.getEmail());

      if (findEmployee != null)
        throw new Exception("Usuario ya registrado");

      Client clientSaved = clientRepository.save(client);
      return ResponseEntity.created(null).body(clientSaved);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Client> findByIdClient(UUID id) {
    try {
      Client client = clientRepository.findById(id).orElseThrow();
      return ResponseEntity.ok(client);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }

  }

  public ResponseEntity<Client> updateByIdClient(UUID id, Client client) {
    try {
      Client findClient = clientRepository.findById(id).orElseThrow();
      if (findClient == null)
        throw new Exception("Client not found");
      client.setEmail(findClient.getEmail());
      client.setPassword(findClient.getPassword());
      client.setCode(findClient.getCode());
      client.setIsVerified(findClient.getIsVerified());

      Client clientSaved = clientRepository.save(client);
      return ResponseEntity.ok(clientSaved);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Void> deleteByIdClient(UUID id) {
    try {
      List<Reserved> reserveds = reservedService.findAllReservationsByClientId(id);
      System.out.println(reserveds);

      if (reserveds.size() > 0) {
        System.out.println("Tiene Reservaciones");
        for (Reserved reserved : reserveds) {
          reserved.setClient(null);
          reservedService.updateByIdReserved(reserved.getId(), reserved);
        }
      }

      clientRepository.deleteById(id);
      return ResponseEntity.status(204).build();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

}
