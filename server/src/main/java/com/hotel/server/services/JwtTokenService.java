package com.hotel.server.services;

import java.util.UUID;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtTokenService {
  private static final String SECRET = "hotelSecretKeyhoteleriaissecrentmykeylearning";
  private static final long EXPIRATION_TIME = 864_000_000; // 10 días

  public String generateToken(UUID id) {
    try {

      String token = Jwts.builder().id(id.toString()).expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
          .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
          .compact();
      return token;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @SuppressWarnings("deprecation")
  public UUID getIdFromToken(String token) {
    try {
      Claims claims = Jwts.parser().setSigningKey(SECRET.getBytes()).build().parseClaimsJws(token).getBody();
      return UUID.fromString(claims.getId());

    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @SuppressWarnings("deprecation")
  public Boolean isTokenValid(String token) {
    try {
      Claims claims = Jwts.parser().setSigningKey(SECRET.getBytes()).build().parseClaimsJws(token).getBody();
      Date expiration = claims.getExpiration();
      return !expiration.before(new Date());

    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }

}
