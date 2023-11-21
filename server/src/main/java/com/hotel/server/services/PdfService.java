package com.hotel.server.services;

import java.io.ByteArrayOutputStream;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class PdfService {

  public ResponseEntity<?> generatePdf() {
    try {
      Document document = new Document(PageSize.A4, 50, 50, 50, 50);
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      PdfWriter.getInstance(document, baos).close();

      document.open();

      Image image = Image
          .getInstance("src/main/java/com/hotel/server/asset/logohotel.png");
      image.setAlignment(Chunk.ALIGN_CENTER);
      image.scaleAbsolute(500, 100);
      image.setBackgroundColor(new BaseColor(0, 0, 0));

      document.add(image);

      document.add(new Paragraph("Boleta de Venta",
          new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, new BaseColor(180, 180, 180))));

      document.add(new Paragraph("      "));
      document.add(new Paragraph("Empresa"));
      document.add(new Paragraph("Calle 123, Cusco, Perú"));
      document.add(new Paragraph("Teléfono: 123456789"));
      document.add(new Paragraph("Email: waynapicchu@gmail.com"));
      document.add(new Paragraph("RUC: 123456789"));
      document.add(new Paragraph("Fecha: 01/01/2020"));

      document.add(new Paragraph("Datos del Cliente"));
      document.add(new Paragraph("Cliente: Juan Perez"));
      document.add(new Paragraph("DNI: 12345678"));
      document.add(new Paragraph("Dirección: Calle 123"));
      document.add(new Paragraph("Teléfono: 123456789"));
      document.add(new Paragraph("Email: juan@gmail.com"));

      document.add(new Paragraph("      "));
      document.add(new Paragraph("      "));

      PdfPTable table = new PdfPTable(5);
      table.addCell("Habitacion");
      table.addCell("Fecha de Ingreso");
      table.addCell("Fecha de Salida");
      table.addCell("Número de Noches");
      table.addCell("Monto Total");

      document.add(table);

      document.add(new Paragraph("      "));
      document.add(new Paragraph("      "));
      document.add(new Paragraph("      "));
      Paragraph paragraph = new Paragraph("Gracias por su preferencia!!");
      paragraph.setAlignment(Paragraph.ALIGN_RIGHT);
      document.add(paragraph);

      document.close();

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_PDF);
      headers.setContentDispositionFormData("inline", "document.pdf");

      return ResponseEntity.ok().headers(headers).body(baos.toByteArray());

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }

}
