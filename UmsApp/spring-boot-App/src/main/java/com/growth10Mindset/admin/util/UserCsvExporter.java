package com.luv2code.ecommerce.util;

import java.io.IOException;
import java.lang.reflect.Field;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

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
            header = Arrays.stream(userFields)
                .map(Field::getName)
                .filter(fieldName -> !fieldName.equals("password") && !fieldName.equals("photos") && !fieldName.equals("photoFile"))
                .toArray(String[]::new);

            fieldsToMap = Arrays.stream(userFields)
                .map(Field::getName)
                // Use filter to exclude specific fields
                .filter(fieldName -> !fieldName.equals("password") && !fieldName.equals("photos") && !fieldName.equals("photoFile"))
                .toArray(String[]::new);

            csvWriter.writeNext(header);

            for (User user : listUsers) {
                String[] data = new String[fieldsToMap.length];
                for (int i = 0; i < fieldsToMap.length; i++) {
                	 String fieldName = fieldsToMap[i];
                     try {
                         Field field = user.getClass().getDeclaredField(fieldName);
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
