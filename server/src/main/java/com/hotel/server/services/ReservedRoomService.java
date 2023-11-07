package com.hotel.server.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotel.server.dao.ReservedRoomRepository;
import com.hotel.server.models.AditionalServices;
import com.hotel.server.models.Client;
import com.hotel.server.models.Manager;
import com.hotel.server.models.ReservedRoom;
import com.hotel.server.models.Room;

@Service
public class ReservedRoomService {

  @Autowired
  private ReservedRoomRepository reservedRoomRepository;
  @Autowired
  private ClienteService clienteService;
  @Autowired
  private ManagerService managerService;
  @Autowired
  private RoomService roomService;
  @Autowired
  private AditionalServicesService aditionalServicesService;

  public List<ReservedRoom> getAllReservedRooms() {
    return reservedRoomRepository.findAll();
  }

  public ReservedRoom getReservedRoomById(UUID id) {
    return reservedRoomRepository.findById(id).orElse(null);
  }

  @Transactional
  public ReservedRoom saveReservedRoom(ReservedRoom reservedRoom) {
    System.out.println(reservedRoom);

    Client mewclient = clienteService.getById(reservedRoom.getClient().getId());
    reservedRoom.setClient(mewclient);
    Manager newmanager = managerService.getManagerById(reservedRoom.getManager().getId());
    reservedRoom.setManager(newmanager);
    Room newroom = roomService.getRoomById(reservedRoom.getRoom().getId());
    reservedRoom.setRoom(newroom);

    List<AditionalServices> newAditionalServices = new ArrayList<>();
    if (reservedRoom.getAditionalServices() != null) {
      for (AditionalServices aditionalService : reservedRoom.getAditionalServices()) {
        AditionalServices newAditionalService = aditionalServicesService
            .getAditionalServicesById(aditionalService.getId());
        newAditionalServices.add(newAditionalService);
      }
    }
    reservedRoom.setAditionalServices(newAditionalServices);

    return reservedRoomRepository.save(reservedRoom);
  }

  public void deleteReservedRoom(UUID id) {
    reservedRoomRepository.deleteById(id);
  }

  public ReservedRoom UpdateReservedRoom(ReservedRoom reservedRoom) {
    ReservedRoom existingReservedRoom = reservedRoomRepository.findById(reservedRoom.getId()).orElse(null);
    existingReservedRoom.setDateIn(reservedRoom.getDateIn());
    existingReservedRoom.setDateOut(reservedRoom.getDateOut());
    existingReservedRoom.setRoom(reservedRoom.getRoom());
    existingReservedRoom.setClient(reservedRoom.getClient());
    existingReservedRoom.setAditionalServices(reservedRoom.getAditionalServices());
    existingReservedRoom.setTotal(reservedRoom.getTotal());
    existingReservedRoom.setNumberPeople(reservedRoom.getNumberPeople());
    existingReservedRoom.setManager(reservedRoom.getManager());
    existingReservedRoom.setReservationState(reservedRoom.getReservationState());

    return reservedRoomRepository.save(existingReservedRoom);
  }

}
