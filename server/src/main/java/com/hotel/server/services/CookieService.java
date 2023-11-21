package com.hotel.server.services;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;

@Service
public class CookieService {

  public Cookie setCookie(String nameCookie, String valueCookie) {
    Cookie cookie = new Cookie(nameCookie, valueCookie);
    cookie.setPath("/");
    cookie.setMaxAge(3600);
    return cookie;
  }

  public Cookie deleteCookie(String nameCookie) {
    Cookie cookie = new Cookie(nameCookie, null);
    cookie.setPath("/");
    cookie.setMaxAge(0);

    return cookie;
  }

}
