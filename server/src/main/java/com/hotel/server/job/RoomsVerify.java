package com.hotel.server.job;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.hotel.server.Emuns.ReservationStateE;
import com.hotel.server.Emuns.RoomStateE;
import com.hotel.server.models.ReservedRoom;
import com.hotel.server.services.ReservedRoomService;
import com.hotel.server.services.RoomService;

@Component
public class RoomsVerify {
  @Autowired
  private RoomService roomService;
  @Autowired
  private ReservedRoomService reservedRoomService;

  @Scheduled(cron = "0 50 23 * * *")
  public void myTask() {
    Date date = new Date();
    List<ReservedRoom> reservedRoom = reservedRoomService.getAllReservedRooms();

    for (ReservedRoom reservedRoom2 : reservedRoom) {
      if (reservedRoom2.getDateOut().before(date)) {
        reservedRoom2.getRoom().setState(RoomStateE.DISPONIBLE);
        roomService.updateRoom(reservedRoom2.getRoom().getId(), reservedRoom2.getRoom());
        reservedRoom2.setReservationState(ReservationStateE.FINALIZADO);
        reservedRoomService.saveReservedRoom(reservedRoom2);
      }
    }
    System.out.println("Se ejecuto la tarea");
  }
}
