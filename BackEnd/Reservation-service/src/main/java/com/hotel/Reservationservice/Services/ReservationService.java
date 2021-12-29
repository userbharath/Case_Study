package com.hotel.Reservationservice.Services;

import java.util.List;

import com.hotel.Reservationservice.Models.Reservation;
import com.hotel.Reservationservice.Models.ReservationList;

public interface ReservationService {

	String bookRoom(Reservation res);

	ReservationList getReservations();

	Reservation updateRes(Reservation res);

	String deleteRes(int id);
	
	List<Reservation> getReservationsById(int id);

}
