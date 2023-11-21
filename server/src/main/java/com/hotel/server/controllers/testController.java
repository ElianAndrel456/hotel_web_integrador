package com.hotel.server.controllers;

// import java.util.List;
// import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.hotel.server.services.EmailService;
// import com.hotel.server.services.JwtTokenService;
import com.hotel.server.services.PdfService;

@RestController
@RequestMapping("/api/test")
public class testController {

  // @Autowired
  // private JwtTokenService jwtTokenService;

  // @Autowired
  // private EmailService emailService;

  @Autowired
  private PdfService pdfService;

  @GetMapping
  public ResponseEntity<?> test() {
    // UUID id = UUID.randomUUID();
    // String token = jwtTokenService.generateToken(id);
    // System.out.println(token);
    // System.out.println(jwtTokenService.getIdFromToken(token));
    // System.out.println(jwtTokenService.isTokenValid(token));

    // emailService.sendEmail("elian_joyo_villanueva@hotmail.com", "Test", "Test");

    return pdfService.generatePdf();

  }

}
