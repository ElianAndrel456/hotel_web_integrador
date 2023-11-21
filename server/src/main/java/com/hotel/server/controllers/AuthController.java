package com.hotel.server.controllers;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.server.models.Client;
import com.hotel.server.models.Employee;
import com.hotel.server.services.AuthService;
import com.hotel.server.services.ClientService;
import com.hotel.server.services.CookieService;
import com.hotel.server.services.EmployeeService;
import com.hotel.server.services.JwtTokenService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  @Autowired
  private JwtTokenService jwtTokenService;

  @Autowired
  private CookieService cookieService;

  @Autowired
  private ClientService clientService;

  @Autowired
  private EmployeeService employeeService;

  @PostMapping("/register")
  public ResponseEntity<Client> register(@Valid @RequestBody Client client) {
    try {
      return authService.registerUser(client);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  @PostMapping("/validUser")
  public ResponseEntity<?> validUser(@RequestBody Map<String, String> body) {
    try {
      return authService.verifyUser(body);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return ResponseEntity.internalServerError().build();
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String, String> body, HttpServletResponse response) {
    try {
      Client client = authService.loginClient(body);
      if (client == null) {
        Employee employee = authService.loginEmployee(body);
        if (employee == null)
          return ResponseEntity.badRequest().build();

        String token = jwtTokenService.generateToken(employee.getId());
        Cookie cookie = cookieService.setCookie("token", token);
        response.addCookie(cookie);
        return ResponseEntity.ok(employee);
      } else {
        String token = jwtTokenService.generateToken(client.getId());
        Cookie cookie = cookieService.setCookie("token", token);
        response.addCookie(cookie);
        return ResponseEntity.ok(client);

      }

    } catch (Exception e) {
      System.out.println(e.getMessage());
      return ResponseEntity.internalServerError().build();
    }
  }

  @GetMapping("/logout")
  public ResponseEntity<?> logout(HttpServletResponse response) {
    try {
      Cookie cookie = cookieService.deleteCookie("token");
      response.addCookie(cookie);

      return authService.logoutUser();
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return ResponseEntity.internalServerError().build();
    }
  }

  @PostMapping("/authToken")
  public ResponseEntity<?> authToken(@RequestBody Map<String, String> body) {
    try {
      if (body.get("token") == null)
        return ResponseEntity.badRequest().build();

      Boolean isValidToken = jwtTokenService.isTokenValid(body.get("token"));
      System.out.println("AuthController.authToken()");

      if (!isValidToken)
        return ResponseEntity.badRequest().build();

      UUID id = jwtTokenService.getIdFromToken(body.get("token"));

      Client findClientByToken = clientService.findByIdClient(id).getBody();

      if (findClientByToken == null) {

        Employee findEmployeeByToken = employeeService.findByIdEmployee(id);
        return ResponseEntity.ok(findEmployeeByToken);

      } else {
        return ResponseEntity.ok(findClientByToken);
      }
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return ResponseEntity.internalServerError().build();
    }
  }

}
