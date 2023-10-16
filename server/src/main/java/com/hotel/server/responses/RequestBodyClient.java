package com.hotel.server.responses;

import com.hotel.server.models.Client;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class RequestBodyClient extends Client {
  private String username;
  private String password;

}
