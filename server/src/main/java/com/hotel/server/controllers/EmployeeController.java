package com.hotel.server.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.server.models.Employee;
import com.hotel.server.services.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  @GetMapping
  public ResponseEntity<List<Employee>> findAll() {
    try {
      return employeeService.findAllEmployees();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping
  public ResponseEntity<Employee> save(@Valid @RequestBody Employee employee) {
    try {
      return employeeService.createEmployee(employee);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }

  }

  @PutMapping("/{id}")
  public ResponseEntity<Employee> update(@PathVariable UUID id, @Valid @RequestBody Employee employee) {
    try {
      return employeeService.updateByIdEmployee(id, employee);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
    try {
      return employeeService.deleteByIdEmployee(id);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }

}
