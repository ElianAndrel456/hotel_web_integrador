package com.hotel.server.services;

import java.io.ByteArrayOutputStream;
import org.springframework.stereotype.Service;

import com.hotel.server.models.Reserved;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class PdfService {

  public byte[] generatePdf(Reserved reserved) {
    try {
      Document document = new Document(PageSize.A4, 50, 50, 50, 50);
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      PdfWriter.getInstance(document, baos);

      document.open();

      // String path = "src/main/java/com/hotel/server/assets/logohotel.png";
      // File imageFile = new File(path);

      // Image image = Image.getInstance(imageFile.getAbsolutePath());
      // image.setAlignment(Chunk.ALIGN_CENTER);
      // image.scaleAbsolute(500, 100);
      // image.setBackgroundColor(new BaseColor(0, 0, 0));

      // document.add(image);

      document.add(new Paragraph("Boleta de Venta",
          new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, new BaseColor(180, 180, 180))));

      document.add(new Paragraph("      "));
      document.add(new Paragraph("Empresa"));
      document.add(new Paragraph("Calle 123, Cusco, Perú"));
      document.add(new Paragraph("Teléfono: 123456789"));
      document.add(new Paragraph("Email: waynapicchu@gmail.com"));
      document.add(new Paragraph("RUC: 123456789"));
      document.add(new Paragraph("Fecha: " + reserved.getDateReserved()));

      document.add(new Paragraph("Datos del Cliente"));
      document.add(new Paragraph("Cliente: " + reserved.getClient().getNames()));
      document.add(new Paragraph("DNI: " + reserved.getClient().getDni()));
      document.add(new Paragraph("Dirección: " + reserved.getClient().getAddress()));
      document.add(new Paragraph("Teléfono: " + reserved.getClient().getPhone()));
      document.add(new Paragraph("Email: " + reserved.getClient().getEmail()));

      document.add(new Paragraph("      "));
      document.add(new Paragraph("      "));

      PdfPTable table = new PdfPTable(5);
      table.addCell("Habitacion");
      table.addCell("Fecha de Ingreso");
      table.addCell("Fecha de Salida");
      table.addCell("Servicios Adicionales");
      table.addCell("Monto Total");

      table.addCell(reserved.getRoom().getNumberRoom());
      table.addCell(reserved.getDateEntry().toString());
      table.addCell(reserved.getDateDeparture().toString());

      String additional = "";
      for (int i = 0; i < reserved.getServices().size(); i++) {
        additional += reserved.getServices().get(i).getName() + ", ";
      }
      table.addCell(additional);
      table.addCell(reserved.getTotal().toString());

      document.add(table);

      document.add(new Paragraph("      "));
      document.add(new Paragraph("      "));
      document.add(new Paragraph("      "));
      Paragraph paragraph = new Paragraph("Gracias por su preferencia!!", new Font(Font.FontFamily.TIMES_ROMAN, 12,
          Font.BOLD, new BaseColor(180, 180, 180)));
      paragraph.setAlignment(Paragraph.ALIGN_RIGHT);
      document.add(paragraph);

      document.close();

      return baos.toByteArray();

    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

}
