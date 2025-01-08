package com.moviedating.backend.Entity;

import com.moviedating.backend.Entity.Movie;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer accountId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @OneToOne
    @JoinColumn(name = "movieId", nullable = false)
    private Movie favoriteMovie;

    @Column(nullable = false)
    private String favoriteGenre;

    @Column(nullable = false)
    private String Gender;

}
