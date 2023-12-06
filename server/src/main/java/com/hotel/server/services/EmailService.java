package com.hotel.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
  @Autowired
  private JavaMailSender javaMailSender;

  @Autowired
  private TemplateEngine templateEngine;

  public void sendEmail(String to, String subject, String text) {
    MimeMessage message = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

    try {
      Context context = new Context();
      context.setVariable("title", "Bienvenido a Hotel, gracias por registrarte");
      context.setVariable("content", "Codigo de verificacion: " + text);

      String htmlContent = templateEngine.process("email-template", context);

      helper.setTo(to);
      helper.setSubject(subject);
      helper.setText(htmlContent, true);
      javaMailSender.send(message);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void sendEmailWithDocument(String to, String subject, String text, byte[] doc) {
    try {
      MimeMessage message = javaMailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
      Context context = new Context();
      context.setVariable("title", "Se ha realizado su reserva");
      context.setVariable("content", "" + text);

      String htmlContent = templateEngine.process("email-template", context);

      helper.addAttachment("documento.pdf", new ByteArrayResource(doc), "application/pdf");

      helper.setTo(to);
      helper.setSubject(subject);
      helper.setText(htmlContent, true);

      javaMailSender.send(message);
    } catch (Exception e) {
      e.printStackTrace();
    }

  }

}