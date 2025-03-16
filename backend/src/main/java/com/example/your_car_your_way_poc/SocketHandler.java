package com.example.your_car_your_way_poc;

import com.example.your_car_your_way_poc.model.Message;
import com.google.gson.Gson;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class SocketHandler extends TextWebSocketHandler {
    List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws IOException {

        for (WebSocketSession webSocketSession : sessions) {
            // Sends message to all sessions excepted himself
            if (!session.equals(webSocketSession)) {
                Message value = new Gson().fromJson(message.getPayload(), Message.class);
                webSocketSession.sendMessage(new TextMessage(new Gson().toJson(value)));
            }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // Will add the session to list -> to broadcast messages
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
    }

}
