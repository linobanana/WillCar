package com.exadel.carpoolfree.service;

import com.exadel.carpoolfree.model.Role;
import com.exadel.carpoolfree.model.view.UserVO;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.HashSet;
import java.util.Set;

public class NewDetails {

    UserService userService;

    public NewDetails(UserService userService) {
        this.userService = userService;
    }

    public void updateRole(String role) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication auth = context.getAuthentication();
        String login = context.getAuthentication().getName();
        UserVO user1 = userService.findUserByLogin(login);
        Set<GrantedAuthority> updatedAuthorities = new HashSet<>();
        for (Role role1 : user1.getRoles()) {
            if (role1.name().equals("ADMIN")) {
                updatedAuthorities.add(new SimpleGrantedAuthority(role1.name()));
            }
        }
        updatedAuthorities.add(new SimpleGrantedAuthority(role));

        if (role.equals("DRIVER")) {
            if (!user1.getCars().isEmpty()) {
                Authentication newAuth = new UsernamePasswordAuthenticationToken(
                        auth.getPrincipal(), auth.getCredentials(), updatedAuthorities);

                SecurityContextHolder.getContext().setAuthentication(newAuth);
            } else {
                throw new RuntimeException("You have no cars");
            }
        } else if (role.equals("PASSENGER")) {
            Authentication newAuth = new UsernamePasswordAuthenticationToken(
                    auth.getPrincipal(), auth.getCredentials(), updatedAuthorities);

            SecurityContextHolder.getContext().setAuthentication(newAuth);
        } else {
        }

        System.out.println(context.getAuthentication().getAuthorities());
    }
}
