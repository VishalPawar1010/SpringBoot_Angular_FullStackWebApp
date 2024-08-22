package com.growth10Mindset.admin.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/application")
    @SendTo("/topic/messages")
    public String handleTextMessage(String message) {
        return message;
    }
}
