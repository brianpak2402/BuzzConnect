package com.team56.BuzzConnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BuzzConnectApplication {
	public static void main(String[] args) {
		SpringApplication.run(BuzzConnectApplication.class, args);
		System.out.println("\n\n====== SUCCESSFULLY CONNECTED TO BUZZCONNECT API ======");
	}
}
