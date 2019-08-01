package com.exadel.carpoolfree.service;

import com.exadel.carpoolfree.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class NotificationService {

    private JavaMailSender javaMailSender;

    @Autowired
    public NotificationService(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    public void sendNotification(User user){

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper;

            helper = new MimeMessageHelper(message, true); // true indicates
            // multipart message
            helper.setSubject("Subject");
            helper.setTo(user.getEmail());
            helper.setFrom("gdxjfcmfc");
            helper.setText("Text", true); // true indicates html
            // continue using helper object for more functionalities like adding attachments, etc.

            javaMailSender.send(message);
        } catch(MessagingException e){
            throw new RuntimeException();
        }
    }

}
