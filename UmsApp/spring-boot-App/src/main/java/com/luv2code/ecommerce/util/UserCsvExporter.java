package com.luv2code.ecommerce.util;

import java.io.IOException;
import java.lang.reflect.Field;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.naming.Reference;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.luv2code.ecommerce.entity.User;
import com.opencsv.CSVWriter;

public class UserCsvExporter {
	
	public void export(List<User> listUsers, HttpServletResponse response) throws IOException  {
		
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
			String timestamp = formatter.format(new Date());
			String fileName = "users_" + timestamp + ".csv";
			
            response.setContentType("text/csv");
            String headerValue = "attachment; filename=" + fileName;
            response.setHeader("Content-Disposition", headerValue);

            CSVWriter csvWriter = new CSVWriter(response.getWriter());

            String[] header;
            String[] fieldsToMap;

            // Get the list of field names from the User class
            Field[] userFields = User.class.getDeclaredFields();
            header = new String[userFields.length];
            fieldsToMap = new String[userFields.length];

            for (int i = 0; i < userFields.length; i++) {
                Field field = userFields[i];
                header[i] = field.getName(); // Use field name as header
                fieldsToMap[i] = field.getName(); // Map field name to field name
            }

            csvWriter.writeNext(header);

            for (User user : listUsers) {
                String[] data = new String[fieldsToMap.length];
                for (int i = 0; i < fieldsToMap.length; i++) {
                    try {
                        Field field = user.getClass().getDeclaredField(fieldsToMap[i]);
                        field.setAccessible(true);
                        Object fieldValue = field.get(user);
                        data[i] = fieldValue != null ? fieldValue.toString() : "";
                    } catch (NoSuchFieldException | IllegalAccessException e) {
                        data[i] = "";
                    }
                }
                csvWriter.writeNext(data);
            }

            csvWriter.close();
		
	}



}
