package com.moviedating.backend.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "gender")
public class Gender {

    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer genderId;


}
