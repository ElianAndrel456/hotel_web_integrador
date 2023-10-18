package com.hotel.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.server.dao.ReservedRoomRepository;
import com.hotel.server.models.ReservedRoom;

@Service
public class ReservedRoomService {

  @Autowired
  private ReservedRoomRepository reservedRoomRepository;

  public List<ReservedRoom> getAllReservedRooms() {
    return reservedRoomRepository.findAll();
  }

  public ReservedRoom getReservedRoomById(Long id) {
    return reservedRoomRepository.findById(id).orElse(null);
  }

  public ReservedRoom saveReservedRoom(ReservedRoom reservedRoom) {
    return reservedRoomRepository.save(reservedRoom);
  }

  public void deleteReservedRoom(Long id) {
    reservedRoomRepository.deleteById(id);
  }

  public ReservedRoom UpdateReservedRoom(ReservedRoom reservedRoom) {
    return reservedRoomRepository.save(reservedRoom);
  }

}
