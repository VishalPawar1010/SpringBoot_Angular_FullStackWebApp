package com.growth10Mindset.admin.util;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletResponse;

import com.growth10Mindset.admin.entity.User;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;


public class UserPdfExporter extends AbstractExporter{
	
	public void export(List<User> listUsers, HttpServletResponse response) throws IOException  {
		try {
		super.setResponseHeader(response, "application/pdf", ".pdf");
		
		Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();
        // Create a title for the PDF
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
        Paragraph title = new Paragraph("List of Users", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(20); // Add space after the title
        document.add(title);

        // Get the list of field names from the User class, excluding specific fields
        Field[] userFields = User.class.getDeclaredFields();
        String[] fieldsToMap = Stream.of(userFields)
                .map(Field::getName)
                .filter(fieldName -> !fieldName.equals("password") && !fieldName.equals("photos") && !fieldName.equals("photoFile"))
                .toArray(String[]::new);

        // Create a table for user data
        PdfPTable table = new PdfPTable(fieldsToMap.length);
        table.setWidthPercentage(100); // Table takes up the full page width
        
        float[] columnWidths = new float[fieldsToMap.length];
        columnWidths[0] = 0.6f; 
        columnWidths[1] = 2.8f; 
        columnWidths[6] = 2f; 

        for (int i = 2; i < fieldsToMap.length-1; i++) {
            columnWidths[i] = 1.3f; // Wider data columns
        }
        table.setWidths(columnWidths);

        // Add table headers with different background color
        BaseColor headerColor = new BaseColor(192, 192, 192); // Light gray
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        for (String fieldName : fieldsToMap) {
            PdfPCell headerCell = new PdfPCell(new Phrase(fieldName, headerFont));
            headerCell.setBackgroundColor(headerColor);
            table.addCell(headerCell);
        }

        // Add user data to the table
        Font dataFont = FontFactory.getFont(FontFactory.HELVETICA);
        for (User user : listUsers) {
            for (String fieldName : fieldsToMap) {
                try {
                    Field field = user.getClass().getDeclaredField(fieldName);
                    field.setAccessible(true);
                    Object fieldValue = field.get(user);
                    String cellValue = fieldValue != null ? fieldValue.toString() : "";
                    table.addCell(new PdfPCell(new Phrase(cellValue, dataFont)));
                } catch (NoSuchFieldException | IllegalAccessException e) {
                    // Handle exceptions or set default values if needed
                    table.addCell(new PdfPCell(new Phrase("", dataFont)));
                }
            }
        }

        // Add the table to the document
        document.add(table);

        document.close();
    } catch (DocumentException e) {
        e.printStackTrace();
    }
}
}

