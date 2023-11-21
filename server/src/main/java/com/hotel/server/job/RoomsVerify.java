package com.hotel.server.job;

// import java.util.Calendar;
// import java.util.Date;
// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
// import org.springframework.transaction.annotation.Transactional;

@Component
public class RoomsVerify {
  // @Autowired
  // private RoomService roomService;
  // @Autowired
  // private ReservedRoomService reservedRoomService;

  // private boolean isSameDay(Date date1, Date date2) {
  // Calendar cal1 = Calendar.getInstance();
  // cal1.setTime(date1);

  // Calendar cal2 = Calendar.getInstance();
  // cal2.setTime(date2);

  // return cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
  // cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH) &&
  // cal1.get(Calendar.DAY_OF_MONTH) == cal2.get(Calendar.DAY_OF_MONTH);
  // }

  // @Scheduled(cron = "0 0 23 * * *")
  // @Transactional
  // public void myTask() {
  // Date date = new Date();
  // List<ReservedRoom> reservedRoom = reservedRoomService.getAllReservedRooms();

  // for (ReservedRoom reservedRoom2 : reservedRoom) {
  // if (isSameDay(reservedRoom2.getDateOut(), date)) {
  // reservedRoom2.getRoom().setState(RoomStateE.DISPONIBLE);
  // roomService.updateRoom(reservedRoom2.getRoom().getId(),
  // reservedRoom2.getRoom());
  // reservedRoom2.setReservationState(ReservationStateE.FINALIZADO);
  // reservedRoomService.saveReservedRoom(reservedRoom2);
  // System.out.println("Se ejecuto la tarea");
  // }
  // }
  // }
}
