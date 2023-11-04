package com.hotel.server.services;

import java.util.List;
import java.util.UUID;

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

  public AditionalServices getAditionalServicesById(UUID id) {
    return aditionalServicesRepository.findById(id).orElse(null);
  }

  public AditionalServices saveAditionalServices(AditionalServices aditionalServices) {
    return aditionalServicesRepository.save(aditionalServices);
  }

  public AditionalServices updateAditionalServices(UUID id, AditionalServices aditionalServices) {
    AditionalServices existingAditionalServices = aditionalServicesRepository.findById(id)
        .orElse(null);
    existingAditionalServices.setName(aditionalServices.getName());
    existingAditionalServices.setDescription(aditionalServices.getDescription());
    existingAditionalServices.setPrice(aditionalServices.getPrice());
    return aditionalServicesRepository.save(existingAditionalServices);

  }

  public void deleteAditionalServices(UUID id) {
    aditionalServicesRepository.deleteById(id);
  }

}
