package com.hotel.server.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.server.models.MercadoPagoWebhookPayload;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferencePaymentMethodRequest;
import com.mercadopago.client.preference.PreferencePaymentMethodsRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.net.MPSearchRequest;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;

@RestController
@RequestMapping("/api/mercadopago")
public class MercadoPagoController {

  @PostMapping
  public Preference pago(@RequestBody Map<String, String> body) {

    MercadoPagoConfig.setAccessToken("TEST-6036410151922517-111710-c9c57fbb0ee9fa52830641d01bedaddf-1294691723");

    PreferenceClient client = new PreferenceClient();

    List<PreferenceItemRequest> items = new ArrayList<>();
    PreferenceItemRequest item = PreferenceItemRequest.builder()
        .title("Dummy Title")
        .description("Dummy description")
        .quantity(1)
        .currencyId("PEN")
        .unitPrice(new BigDecimal("10"))
        .build();
    items.add(item);

    List<PreferencePaymentMethodRequest> excludedPaymentMethods = new ArrayList<>();
    excludedPaymentMethods.add(PreferencePaymentMethodRequest.builder().id("pagoefectivo_atm").build());
    excludedPaymentMethods.add(PreferencePaymentMethodRequest.builder().id("diners").build());

    PreferencePaymentMethodsRequest paymentMethods = PreferencePaymentMethodsRequest.builder()
        .excludedPaymentMethods(excludedPaymentMethods).installments(1).build();

    PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
        .success("http://localhost:8080/success")
        .failure("http://localhost:8080/failure")
        .pending("http://localhost:8080/pending")
        .build();

    String notificationUrl = "https://bb8f-177-91-248-26.ngrok-free.app/api/mercadopago/webhook";

    PreferenceRequest request = PreferenceRequest.builder().items(items).notificationUrl(notificationUrl)
        .additionalInfo(null).payer(null).expires(true).expirationDateFrom(null).expirationDateTo(null)
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
        System.out.println("payment");
        MercadoPagoConfig.setAccessToken("TEST-6036410151922517-111710-c9c57fbb0ee9fa52830641d01bedaddf-1294691723");
        PaymentClient client = new PaymentClient();

        Long paymentId = Long.parseLong(payload.getData().getId());

        System.out.println("get preference");
        System.out.println(client.get(paymentId));
        Payment payment = client.get(paymentId);
        payment.getStatus();
        System.out.println("payment status: " + payment.getStatus());

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
