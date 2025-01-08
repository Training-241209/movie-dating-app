package com.moviedating.backend.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer movieId;

    @Column(nullable = false)
    private String movieName;

    @Column(nullable = false)
    private String movieGenre;
}
