package com.hotel.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.server.models.UserClient;
import com.hotel.server.models.UserManager;
import com.hotel.server.services.UserClientService;
import com.hotel.server.services.UserManagerService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@SuppressWarnings("unchecked")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private UserClientService userClientService;

  @Autowired
  private UserManagerService userManagerService;

  @PostMapping("/login")
  public <T> ResponseEntity<T> authentication(@RequestBody UserClient userClient, HttpServletResponse response) {
    try {

      UserClient findUser = userClientService.getUserClientByUsernameAndPassword(userClient.getUser(),
          userClient.getPassword());

      System.out.println("AuthController: " + findUser);
      if (findUser == null) {
        UserManager findManager = userManagerService.getUserManagerByUserAndPassword(userClient.getUser(),
            userClient.getPassword());
        System.out.println("AuthController admin: " + findManager);
        Cookie cookie = new Cookie("h_w_username", findManager.getUser());

        cookie.setMaxAge(3600);
        cookie.setPath("/");
        Cookie cookie2 = new Cookie("h_w_id", findManager.getId().toString());
        cookie2.setMaxAge(3600);
        cookie2.setPath("/");

        response.addCookie(cookie);
        response.addCookie(cookie2);

        findManager.setPassword(null);

        return ResponseEntity.ok().body((T) findManager);
      }

      Cookie cookie = new Cookie("h_w_username", findUser.getUser());

      cookie.setMaxAge(3600);
      cookie.setPath("/");
      Cookie cookie2 = new Cookie("h_w_id", findUser.getId().toString());
      cookie2.setMaxAge(3600);
      cookie2.setPath("/");

      response.addCookie(cookie);
      response.addCookie(cookie2);

      findUser.setPassword(null);

      return ResponseEntity.ok().body((T) findUser);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

}
