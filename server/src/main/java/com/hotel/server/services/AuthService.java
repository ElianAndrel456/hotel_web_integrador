package com.hotel.server.services;

import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hotel.server.models.Client;
import com.hotel.server.models.Employee;

@Service
public class AuthService {

  @Autowired
  private ClientService clientService;

  @Autowired
  private EmployeeService employeeService;

  @Autowired
  private EmailService emailService;

  public ResponseEntity<Client> registerUser(Client client) {
    try {

      Client findClient = clientService.findByEmailClient(client.getEmail()).getBody();
      System.out.println(findClient);

      if (findClient == null) {
        Random random = new Random();
        int code = random.nextInt(999999) + 100000;
        String codeString = String.valueOf(code);
        client.setCode(codeString);
        client.setIsVerified(false);
        Client newClient = clientService.createClient(client).getBody();

        emailService.sendEmail(client.getEmail(), "Código de verificación",
            "Su código de verificación es: " + codeString);

        newClient.setCode(null);
        newClient.setPassword(null);
        newClient.setPhone(null);
        newClient.setAddress(null);
        newClient.setIsVerified(null);
        newClient.setDni(null);

        return ResponseEntity.created(null).body(newClient);
      } else if (findClient != null && findClient.getIsVerified() == false && findClient.getCode().length() == 6) {
        emailService.sendEmail(findClient.getEmail(), "Código de verificación",
            "Su código de verificación es: " + findClient.getCode());
        findClient.setCode(null);
        findClient.setPassword(null);
        findClient.setPhone(null);
        findClient.setAddress(null);
        findClient.setIsVerified(null);
        findClient.setDni(null);

        return ResponseEntity.created(null).body(findClient);
      } else {
        throw new Exception("Usuario ya registrado");
      }

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }

  public ResponseEntity<Boolean> verifyUser(Map<String, String> body) {
    try {
      System.out.println(body);
      Client findClient = clientService.findByEmailClient(body.get("email")).getBody();

      if (findClient == null)
        throw new Exception("Usuario no encontrado");
      if (!findClient.getCode().equals(body.get("code")) || body.get("code") == null)
        throw new Exception("Código incorrecto");

      System.out.println(findClient.getId());
      findClient.setIsVerified(true);
      findClient.setCode(null);
      clientService.updateByIdClient(findClient.getId(), findClient);

      return ResponseEntity.ok().build();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }

  public Client loginClient(Map<String, String> body) {
    try {
      if (body.get("email") == null || body.get("password") == null)
        throw new Exception("Campos incompletos");

      Client findClient = clientService.findByEmailClient(body.get("email")).getBody();
      if (findClient.getPassword().equals(body.get("password")))
        return findClient;
      else
        throw new Exception("Contraseña incorrecta");

    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  public Employee loginEmployee(Map<String, String> body) {
    try {
      if (body.get("email") == null || body.get("password") == null)
        throw new Exception("Campos incompletos");

      Employee findEmployee = employeeService.findByEmailEmployee(body.get("email"));
      if (findEmployee.getPassword().equals(body.get("password")))
        return findEmployee;
      else
        throw new Exception("Contraseña incorrecta");
    } catch (Exception e) {
      return null;
    }
  }

  public ResponseEntity<?> logoutUser() {
    try {

      return ResponseEntity.ok().build();

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }

}
