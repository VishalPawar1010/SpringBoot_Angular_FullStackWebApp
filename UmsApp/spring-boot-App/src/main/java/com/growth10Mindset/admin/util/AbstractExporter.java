package com.growth10Mindset.admin.util;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

public class AbstractExporter {
	public void setResponseHeader(HttpServletResponse response, String contentType, String extension) 
			throws IOException  {
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
		String timestamp = formatter.format(new Date());
		String fileName = "users_" + timestamp + extension;
		
	    response.setContentType(contentType);
	    String headerValue = "attachment; filename=" + fileName;
	    response.setHeader("Content-Disposition", headerValue);

	}
	
	

}
