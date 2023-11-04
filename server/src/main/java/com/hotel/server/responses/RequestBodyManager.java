package com.hotel.server.responses;

import com.hotel.server.models.Manager;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class RequestBodyManager extends Manager {
  private String username;
  private String password;
}
