package com.hotel.Reservationservice.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.hotel.Reservationservice.Models.Reservation;

public interface ReservationRepo extends MongoRepository<Reservation, Integer> {
	
	@Query(value="{'guestId':?0}")
	List<Reservation> getReservationsById(int id);

}
