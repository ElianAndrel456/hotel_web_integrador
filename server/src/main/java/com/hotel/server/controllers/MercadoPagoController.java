package com.hotel.server.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.server.Emuns.ReservedStateE;
import com.hotel.server.Emuns.RoomStateE;
import com.hotel.server.models.Client;
import com.hotel.server.models.MercadoPagoWebhookPayload;
import com.hotel.server.models.Reserved;
import com.hotel.server.models.Room;
import com.hotel.server.services.ClientService;
import com.hotel.server.services.EmailService;
import com.hotel.server.services.PdfService;
import com.hotel.server.services.ReservedService;
import com.hotel.server.services.RoomService;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferencePayerRequest;
import com.mercadopago.client.preference.PreferencePaymentMethodRequest;
import com.mercadopago.client.preference.PreferencePaymentMethodsRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/mercadopago")
public class MercadoPagoController {
  private final String accessToken = "TEST-6036410151922517-111710-c9c57fbb0ee9fa52830641d01bedaddf-1294691723";
  @Autowired
  private ReservedService reservedService;

  @Autowired
  private RoomService roomService;

  @Autowired
  private ClientService clientService;

  @Autowired
  private EmailService emailService;

  @Autowired
  private PdfService pdfService;

  @PostMapping
  public Preference pago(@RequestBody Reserved body) {

    Room findRoom = roomService.findByIdRoom(body.getRoom().getId()).getBody();
    if (findRoom.getId() != body.getRoom().getId() || findRoom.getState().equals(RoomStateE.RESERVADO))
      throw new Error("Room is not available");

    Client findClient = clientService.findByIdClient(body.getClient().getId()).getBody();
    if (findClient.getId() != body.getClient().getId())
      throw new Error("Client is not available");

    body.setState(ReservedStateE.PENDIENTE);
    Reserved reserved = reservedService.createReserved(body).getBody();
    if (reserved == null)
      throw new Error("Error creating reserved");

    MercadoPagoConfig.setAccessToken(accessToken);

    PreferenceClient client = new PreferenceClient();

    List<PreferenceItemRequest> items = new ArrayList<>();
    PreferenceItemRequest item = PreferenceItemRequest.builder().id(reserved.getId().toString())
        .title("Reserva de la Habitacion " + findRoom.getNumberRoom())
        .description("Reservacion de habitacion y servicios adicionales")
        .quantity(1)
        .currencyId("PEN")
        .unitPrice(new BigDecimal(reserved.getTotal()))
        .build();
    items.add(item);

    PreferencePayerRequest payer = PreferencePayerRequest.builder()
        .name(findClient.getNames())
        .email(findClient.getEmail()).build();

    List<PreferencePaymentMethodRequest> excludedPaymentMethods = new ArrayList<>();
    excludedPaymentMethods.add(PreferencePaymentMethodRequest.builder().id("pagoefectivo_atm").build());
    excludedPaymentMethods.add(PreferencePaymentMethodRequest.builder().id("diners").build());

    PreferencePaymentMethodsRequest paymentMethods = PreferencePaymentMethodsRequest.builder()
        .excludedPaymentMethods(excludedPaymentMethods).installments(1).build();

    PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
        .success("http://localhost:5173")
        .failure("http://localhost:5173")
        .pending("http://localhost:5173")
        .build();

    String notificationUrl = "https://634f-190-12-77-88.ngrok-free.app/api/mercadopago/webhook";

    PreferenceRequest request = PreferenceRequest.builder().items(items).notificationUrl(notificationUrl).payer(payer)
        .expires(true).expirationDateFrom(null)
        .expirationDateTo(null)
        .paymentMethods(paymentMethods)
        .backUrls(backUrls).build();

    try {
      Preference payment = client.create(request);

      return payment;
    } catch (MPApiException ex) {
      System.out.printf(
          "MercadoPago Error. Status: %s, Content: %s%n",
          ex.getApiResponse().getStatusCode(), ex.getApiResponse().getContent());
      return null;

    } catch (MPException ex) {
      ex.printStackTrace();
      return null;
    }
  }

  @PostMapping("/webhook")
  @ResponseStatus(HttpStatus.OK)
  public void webhook(@RequestBody MercadoPagoWebhookPayload payload) {
    try {
      System.out.println("webhook Endpoint");
      System.out.println(payload);

      if (payload.getType() != null && payload.getType().equals("payment")) {

        MercadoPagoConfig.setAccessToken(accessToken);
        PaymentClient client = new PaymentClient();
        Long paymentId = Long.parseLong(payload.getData().getId());
        System.out.println("paymentId: " + paymentId);
        Payment payment = client.get(paymentId);

        if (payment.getStatus().equals("approved")) {
          log.info("Payment approved", payment);
          System.out.println(payment);

          Reserved reserved = reservedService
              .findByIdReserved(UUID.fromString(payment.getAdditionalInfo().getItems().get(0).getId()))
              .getBody();
          reserved.setState(ReservedStateE.CONFIMADO);
          reservedService.updateByIdReserved(reserved.getId(), reserved);

          byte[] doc = pdfService.generatePdf(reserved);

          emailService.sendEmailWithDocument(reserved.getClient().getEmail(), "Pago de su reserva en Hotel Waynapicchu",
              "Detalles del pago de su reservacion en nuestro hotel habitacion:" + reserved.getRoom().getNumberRoom()
                  + " - " + reserved.getClient().getNames(),
              doc);
        }

      } else {
        System.out.println("not payment");
      }

    } catch (MPApiException ex) {
      System.out.printf(
          "MercadoPago Error. Status: %s, Content: %s%n",
          ex.getApiResponse().getStatusCode(), ex.getApiResponse().getContent());

    } catch (MPException ex) {
      ex.printStackTrace();
    }
  }

}
