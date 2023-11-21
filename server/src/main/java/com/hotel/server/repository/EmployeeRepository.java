package com.hotel.server.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

  Employee findByEmail(String email);
}
