package com.hotel.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import com.hotel.server.models.Employee;
import com.hotel.server.repository.EmployeeRepository;

@Service
public class EmployeeService {

  @Autowired
  private EmployeeRepository employeeRepository;

  public ResponseEntity<List<Employee>> findAllEmployees() {
    try {

      List<Employee> employees = employeeRepository.findAll();
      return ResponseEntity.ok(employees);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public Employee findByIdEmployee(UUID id) {
    try {
      Employee employee = employeeRepository.findById(id).orElseThrow();
      return employee;

    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  public Employee findByEmailEmployee(String email) {
    try {
      Employee employee = employeeRepository.findByEmail(email);
      return employee;

    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  public ResponseEntity<Employee> createEmployee(Employee employee) {
    try {
      Employee employeeSaved = employeeRepository.save(employee);
      return ResponseEntity.created(null).body(employeeSaved);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Employee> updateByIdEmployee(UUID id, Employee employee) {
    try {
      Employee findEmployee = employeeRepository.findById(id).orElseThrow();
      if (findEmployee == null)
        throw new Exception("Employee not found");
      Employee employeeSaved = employeeRepository.save(employee);
      return ResponseEntity.ok(employeeSaved);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Void> deleteByIdEmployee(UUID id) {
    try {
      employeeRepository.deleteById(id);
      return ResponseEntity.status(204).build();

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

}
