package com.hotel.server.services;

import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hotel.server.Emuns.RoomStateE;
import com.hotel.server.models.Additional;
import com.hotel.server.models.Reserved;
import com.hotel.server.models.Room;
import com.hotel.server.repository.ReservedRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReservedService {
  @Autowired
  private ReservedRepository reservedRepository;

  @Autowired
  private RoomService roomService;

  @Autowired
  private AdditionalService additionalService;

  public ResponseEntity<List<Reserved>> findAllReserved() {
    try {
      List<Reserved> reserveds = reservedRepository.findAll();
      return ResponseEntity.ok(reserveds);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public List<Reserved> findAllReservationsByClientId(UUID clientId) {
    try {
      return reservedRepository.findAllReservdsByClientId(clientId);
    } catch (Exception e) {
      e.printStackTrace();
      return Collections.emptyList();
    }
  }

  public List<Reserved> findALlReservationsByRoomId(UUID roomId) {
    try {
      return reservedRepository.findAllReservedsByRoomId(roomId);
    } catch (Exception e) {
      e.printStackTrace();
      return Collections.emptyList();
    }
  }

  public ResponseEntity<Reserved> createReserved(Reserved reserved) {
    try {

      Double amount = 0.0;

      reserved.setDateReserved(new Date());

      Room findRoom = roomService.findByIdRoom(reserved.getRoom().getId()).getBody();
      if (findRoom == null)
        throw new Exception("Room not found");
      findRoom.setState(RoomStateE.RESERVADO);
      roomService.updateByIdRoom(findRoom.getId(), findRoom);

      if (reserved.getServices().size() > 0) {

        for (Additional additional : reserved.getServices()) {
          Additional findAdditional = additionalService.findByIdAdditional(additional.getId()).getBody();
          if (findAdditional == null)
            throw new Exception("Additional not found");
          amount += findAdditional.getPrice();
        }
      }

      Long days = ChronoUnit.DAYS.between(
          reserved.getDateEntry().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
          reserved.getDateDeparture().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
      log.info("Days: " + days);
      amount += findRoom.getPrice() * days;
      log.info("Amount: " + amount);
      reserved.setTotal(amount);

      Reserved reservedSaved = reservedRepository.save(reserved);
      return ResponseEntity.created(null).body(reservedSaved);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Reserved> findByIdReserved(UUID id) {
    try {
      Reserved reserved = reservedRepository.findById(id).orElseThrow();
      return ResponseEntity.ok(reserved);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Reserved> updateByIdReserved(UUID id, Reserved reserved) {
    try {
      Reserved findReserved = reservedRepository.findById(id).orElseThrow();
      if (findReserved == null)
        throw new Exception("Reserved not found");

      Reserved reservedSaved = reservedRepository.save(reserved);
      Reserved reservedResponse = reservedRepository.findById(reservedSaved.getId()).orElseThrow();
      return ResponseEntity.ok(reservedResponse);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Void> deleteByIdReserved(UUID id) {
    try {
      reservedRepository.deleteById(id);
      return ResponseEntity.status(204).build();

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

}
