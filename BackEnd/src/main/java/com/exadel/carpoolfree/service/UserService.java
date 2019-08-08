package com.exadel.carpoolfree.service;


import com.exadel.carpoolfree.model.User;
import com.exadel.carpoolfree.model.view.DriveVO;
import com.exadel.carpoolfree.model.view.UserForAdminVO;
import com.exadel.carpoolfree.model.view.UserVO;
import com.exadel.carpoolfree.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final DriveService driveService;
    private ModelMapper modelMapper = new ModelMapper();


    public UserService(UserRepository userRepository, DriveService driveService) {
        this.userRepository = userRepository;
        this.driveService = driveService;
    }


    public List<UserForAdminVO> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> {
                    List<DriveVO> drives = driveService.findAllByUserId(user.getId());
                    UserForAdminVO userVO = convertToAdminVO(user);
                    userVO.setDrives(drives);
                    return userVO;
                })
                .collect(Collectors.toList());
    }



    public UserVO findById(final Long id) {
        return convertToVO(userRepository.findById(id).get());
    }

    public UserVO findCurrentUser() {
        SecurityContext context = SecurityContextHolder.getContext();

        String login = context.getAuthentication().getName();
        if (!login.isEmpty()) {
            return convertToVO(userRepository.findByLogin(login));
        } else {
            return convertToVO(userRepository.findByLogin("aliko"));
        }
    }

    public Set<UserForAdminVO> findAllUsersByMonth(final String stTime, final String finTime) {
        List<DriveVO> driveVOList = driveService.findAllByDateRange(stTime, finTime);
        List<Long> driversId = new ArrayList<>();
        for (DriveVO id : driveVOList) {
            driversId.add(id.getDriver().getId());
        }
        Set<UserForAdminVO> drivers = new HashSet<>();
        for (Long usersId : driversId) {
            drivers.add(convertToAdminVO(userRepository.findById(usersId).get()));
        }
        for (UserForAdminVO driver1 : drivers) {
            List<DriveVO> drives = driveService.findAllByUserId(driver1.getId());
            driver1.setDrives(drives);
        }

        return drivers;
    }

    public UserVO findUserByLogin() {
        SecurityContext context = SecurityContextHolder.getContext();
        String login = context.getAuthentication().getName();
        return convertToVO(userRepository.findByLogin(login));
    }


    public UserVO updateUser(User user) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        String login = securityContext.getAuthentication().getName();
        User checkUser = userRepository.findByLogin(login);
        if (checkUser!=null && user.getId() == checkUser.getId()) {
            return userRepository.findById(user.getId())
                    .map(user1 -> {
                        user1.setPrefCommunication(user.getPrefCommunication());
                        return convertToVO(userRepository.save(user1));
                    })
                    .orElseThrow((() -> new RuntimeException("User not found")));
        } else {
            throw new RuntimeException("Incorrect request");
        }
    }

    public UserVO findUserByLogin(String login) {
        User user = userRepository.findByLogin(login);
        return convertToVO(user);
    }


    private UserVO convertToVO(User user) {
        UserVO userVO = modelMapper.map(user, UserVO.class);
        return userVO;
    }

    private UserForAdminVO convertToAdminVO(User user) {
        UserForAdminVO userVO = modelMapper.map(user, UserForAdminVO.class);
        return userVO;
    }
}
