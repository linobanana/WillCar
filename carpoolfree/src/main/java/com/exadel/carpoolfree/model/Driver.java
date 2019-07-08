package com.exadel.carpoolfree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Driver extends BaseEntity {

    private String firstName;
    private String lastName;
    private String car;

}
