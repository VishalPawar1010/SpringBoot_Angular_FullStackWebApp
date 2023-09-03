package com.growth10Mindset.admin.util;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.MediaType;

import com.growth10Mindset.admin.entity.User;

public class UserExcelExporter extends AbstractExporter{
	
	public void export(List<User> listUsers, HttpServletResponse response) throws IOException  {
		super.setResponseHeader(response, MediaType.APPLICATION_OCTET_STREAM_VALUE, ".xslx");
		
		   // Create a new Excel workbook
	    Workbook workbook = new XSSFWorkbook();
	    
	    // Create a new Excel sheet
	    Sheet sheet = workbook.createSheet("User Data");

	    // Define the header row
	    Row headerRow = sheet.createRow(0);
		
//		"application/octet-stream"
            String[] header;
            String[] fieldsToMap;

            // Get the list of field names from the User class
            Field[] userFields = User.class.getDeclaredFields();
            header = Arrays.stream(userFields)
                .map(Field::getName)
                .filter(fieldName -> !fieldName.equals("password") && !fieldName.equals("photos") && !fieldName.equals("photoFile"))
                .toArray(String[]::new);

            fieldsToMap = Arrays.stream(userFields)
                .map(Field::getName)
                // Use filter to exclude specific fields
                .filter(fieldName -> !fieldName.equals("password") && !fieldName.equals("photos") && !fieldName.equals("photoFile"))
                .toArray(String[]::new);
            
            for (int i = 0; i < fieldsToMap.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(fieldsToMap[i]);
            }

            // Populate the Excel sheet with user data
            int rowNum = 1;

            for (User user : listUsers) {
                Row row = sheet.createRow(rowNum++);
                for (int i = 0; i < fieldsToMap.length; i++) {
                    String fieldName = fieldsToMap[i];
                    try {
                        Field field = user.getClass().getDeclaredField(fieldName);
                        field.setAccessible(true);
                        Object fieldValue = field.get(user);
                        String cellValue = fieldValue != null ? fieldValue.toString() : "";
                        row.createCell(i).setCellValue(cellValue);
                    } catch (NoSuchFieldException | IllegalAccessException e) {
                        // Handle exceptions or set default values if needed
                        row.createCell(i).setCellValue("");
                    }
                }
            }

            // Write the Excel workbook to the response output stream
            try {
                workbook.write(response.getOutputStream());
                workbook.close();
                response.flushBuffer();
            } catch (IOException e) {
                // Handle IO exception
                e.printStackTrace();
            }
            }
	}
