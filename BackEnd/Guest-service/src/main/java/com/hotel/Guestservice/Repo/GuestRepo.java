package com.hotel.Guestservice.Repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.hotel.Guestservice.Models.Guest;

public interface GuestRepo extends MongoRepository<Guest, Integer> {
	
	@Query(value="{'phoneNum':?0}")
    Guest findByPhoneNum(long phoneNum);
}


