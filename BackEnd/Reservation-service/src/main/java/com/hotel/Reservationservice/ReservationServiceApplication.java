package com.hotel.Reservationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@EnableEurekaClient
@OpenAPIDefinition(info = @Info(title = "resevationservices",description ="reservation service",version = "1.0"))
public class ReservationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReservationServiceApplication.class, args);
	}
	
	@Bean
	public RestTemplate getRestTemplate()
	{
		return new RestTemplate();
	}


@Bean
public WebMvcConfigurer corsConfigurer() {
	return new WebMvcConfigurer() {
		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/*").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "OPTIONS").allowedHeaders("*").maxAge(-1);
		}
	};
}
}
