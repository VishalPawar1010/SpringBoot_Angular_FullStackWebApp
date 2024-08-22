import { Component } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent {

  private stompClient: Client;
  responseSubject: string = '';
  webSocketEndPoint: string = 'ws://localhost:8080/api/ws';
  messages: string[] = [];
  messageInput: string = '';

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () =>  SockJS(this.webSocketEndPoint),
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(new Date(), str);
      }
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/all/messages', (message: Message) => {
        this.onMessageReceived(message);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };
  }

  connect() {
    console.log('Initialize WebSocket Connection');
    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient.active) {
      this.stompClient.deactivate();
    }
    console.log('Disconnected');
  }

  sendMessage() {
    console.log('Sending message via WebSocket');
    this.stompClient.publish({ destination: '/app/sendMessage', body: JSON.stringify({ message: this.messageInput }) });
  }

  onMessageReceived(message: Message) {
    console.log('Message Received from Server: ' + message.body);
    const ob = JSON.parse(message.body);
    this.messages.push(ob.message);
  }
}
