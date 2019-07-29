package com.exadel.carpoolfree.model.view;

import com.exadel.carpoolfree.model.Car;
import com.exadel.carpoolfree.model.Role;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class UserVO {


        private Long id;

        private String firstName;

        private String lastName;

        private String phoneNumber;

        private String email;

        private String login;

        private String password;

        private String prefCommunication;

        private Set<Role> roles;

        private Long driverRating;

        private Long passengerRating;

        private List<Car> cars = new ArrayList<>();

        private Double mark;

        public Long getId() {
                return id;
        }

        public String getFirstName() {
                return firstName;
        }

        public String getPhoneNumber() {
                return phoneNumber;
        }

        public String getLastName() {
                return lastName;
        }

        public String getEmail() {
                return email;
        }

        public String getLogin() {
                return login;
        }

        public String getPassword() {
                return password;
        }

        public String getPrefCommunication() {
                return prefCommunication;
        }

        public Long getDriverRating() {
                return driverRating;
        }

        public Long getPassengerRating() {
                return passengerRating;
        }

        public Double getMark() {
                return mark;
        }

        public Set<Role> getRoles() {
                return roles;
        }

        public List<Car> getCars() {
                return cars;
        }

        public void setCars(List<Car> cars) {
                this.cars = cars;
        }

        public void setRoles(Set<Role> roles) {
                this.roles = roles;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public void setMark(Double mark) {
                this.mark = mark;
        }

        public void setPassengerRating(Long passengerRating) {
                this.passengerRating = passengerRating;
        }

        public void setDriverRating(Long driverRating) {
                this.driverRating = driverRating;
        }

        public void setPrefCommunication(String prefCommunication) {
                this.prefCommunication = prefCommunication;
        }

        public void setPassword(String password) {
                this.password = password;
        }

        public void setLogin(String login) {
                this.login = login;
        }

        public void setEmail(String email) {
                this.email = email;
        }

        public void setPhoneNumber(String phoneNumber) {
                this.phoneNumber = phoneNumber;
        }

        public void setLastName(String lastName) {
                this.lastName = lastName;
        }

        public void setFirstName(String firstName) {
                this.firstName = firstName;
        }
}


