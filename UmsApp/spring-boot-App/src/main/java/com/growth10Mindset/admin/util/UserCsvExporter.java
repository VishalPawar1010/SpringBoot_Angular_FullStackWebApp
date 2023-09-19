package com.growth10Mindset.admin.util;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.growth10Mindset.admin.entity.User;
import com.opencsv.CSVWriter;

public class UserCsvExporter extends AbstractExporter {

    public void export(List<User> listUsers, HttpServletResponse response) throws IOException {
        super.setResponseHeader(response, "text/csv", ".csv");

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
