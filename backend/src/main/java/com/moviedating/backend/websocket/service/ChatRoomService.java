package com.moviedating.backend.websocket.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.moviedating.backend.websocket.entity.ChatRoom;
import com.moviedating.backend.websocket.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepo;

    public Optional<String> getChatRoomId(String senderId, String recipientId, boolean createChatRoomIFNotExist){
        Optional<ChatRoom> chatRoom = chatRoomRepo.findBySenderIdAndRecipientId(senderId, recipientId);
        if(chatRoom.isEmpty()){
            if(createChatRoomIFNotExist){
                String chatId = createNewChatId(senderId, recipientId);
                return Optional.of(chatId);
            }
            return Optional.empty();
        }
        return chatRoom.map(ChatRoom::getId);
    }

    private String createNewChatId(String senderId, String recipientId){
        String chatId = String.format(("%s_%s"), senderId, recipientId);

        ChatRoom senderRecipient = new ChatRoom();
        senderRecipient.setId(chatId);
        senderRecipient.setSenderId(senderId);
        senderRecipient.setRecipientId(recipientId);

        ChatRoom recipientSender = new ChatRoom();
        recipientSender.setId(chatId);
        recipientSender.setSenderId(recipientId);
        recipientSender.setRecipientId(senderId);

        chatRoomRepo.save(senderRecipient);
        chatRoomRepo.save(recipientSender);
        return chatId;
    }

    public List<ChatRoom> getAllSenderChatRooms(String senderId){
        return chatRoomRepo.findBySenderId(senderId);
    }
}
