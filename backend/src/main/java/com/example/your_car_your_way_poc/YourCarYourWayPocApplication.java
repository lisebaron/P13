package com.example.your_car_your_way_poc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@SpringBootApplication
@EnableWebSocket
public class YourCarYourWayPocApplication {

	public static void main(String[] args) {
		SpringApplication.run(YourCarYourWayPocApplication.class, args);
	}

}
