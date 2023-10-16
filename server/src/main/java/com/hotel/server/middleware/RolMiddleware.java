package com.hotel.server.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.hotel.server.models.UserManager;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RolMiddleware implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    try {
      System.out.println("RolMiddleware");
      Cookie[] cookies = request.getCookies();
      /* Search user by id, username */
      String username = "";
      String id = "";
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals("h_w_id")) {
          id = cookie.getValue();

        }
        if (cookie.getName().equals("h_w_username")) {
          username = cookie.getValue();
        }
      }
      System.out.println("RolMiddleware: " + username + " " + id);

      UserManager userManager = new UserManager();

      /*
       * String rol = "";
       * for (Cookie cookie : cookies) {
       * if (cookie.getName().equals("rol")) {
       * rol = cookie.getValue();
       * }
       * }
       * if (rol.equals("admin")) {
       * System.out.println("RolMiddleware: true");
       * return true;
       * } else {
       * System.out.println("RolMiddleware: false");
       * return false;
       * }
       */
      return true;
    } catch (Exception e) {
      System.err.println("RolMiddleware: " + e.getMessage());
      return false;
    }
  }

}
