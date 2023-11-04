package com.hotel.server.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.AditionalServices;

public interface AditionalServicesRepository extends JpaRepository<AditionalServices, UUID> {

}
