package com.hotel.server.middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.hotel.server.models.UserManager;
import com.hotel.server.services.UserManagerService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RolMiddleware implements HandlerInterceptor {

  @Autowired
  private UserManagerService userManagerService;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    try {
      System.out.println("RolMiddleware");
      Cookie[] cookies = request.getCookies();
      /* Search user by id, username */
      String username = "";
      Long id = 0L;
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals("h_w_id")) {
          id = Long.parseLong(cookie.getValue());

        }
        if (cookie.getName().equals("h_w_username")) {
          username = cookie.getValue();
        }
      }

      System.out.println("RolMiddleware: " + username + " " + id);

      UserManager findManager = userManagerService.getUserManagerById(id);

      if (findManager == null) {
        System.out.println("RolMiddleware: false");

        throw new Exception("error no se encontro el usuario");
      }

      if (!findManager.getUser().equals(username)) {
        System.out.println("RolMiddleware: false");
        throw new Exception("error no se encontro coincidencia de usuario");
      }

      return true;
    } catch (Exception e) {
      System.err.println("RolMiddleware: " + e.getMessage());
      return false;
    }
  }

}
