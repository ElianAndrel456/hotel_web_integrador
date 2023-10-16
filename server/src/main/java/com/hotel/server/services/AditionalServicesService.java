package com.hotel.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.server.dao.AditionalServicesRepository;
import com.hotel.server.models.AditionalServices;

@Service
public class AditionalServicesService {

  @Autowired
  private AditionalServicesRepository aditionalServicesRepository;

  public List<AditionalServices> getAllAditionalServices() {
    return aditionalServicesRepository.findAll();
  }

  public AditionalServices getAditionalServicesById(Long id) {
    return aditionalServicesRepository.findById(id).orElse(null);
  }

  public AditionalServices saveAditionalServices(AditionalServices aditionalServices) {
    return aditionalServicesRepository.save(aditionalServices);
  }

}