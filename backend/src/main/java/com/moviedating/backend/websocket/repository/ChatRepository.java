package com.moviedating.backend.websocket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moviedating.backend.websocket.entity.Chat;


public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByChatId(String chatId);

    List<Chat> findBySenderIdAndRecipientId(String senderId, String recipientId);
}
