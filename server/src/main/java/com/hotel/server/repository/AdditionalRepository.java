package com.hotel.server.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.server.models.Additional;

public interface AdditionalRepository extends JpaRepository<Additional, UUID> {

}
