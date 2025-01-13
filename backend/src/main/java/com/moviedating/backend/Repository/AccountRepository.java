package com.moviedating.backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moviedating.backend.Entity.Account;
import com.moviedating.backend.Entity.Movie;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findByUsername(String username);
    boolean existsByUsername(String username);
    @Query("SELECT a from Account a WHERE a.favoriteMovie = :movieId AND a.favoriteGenre = :genreId AND a.accountId != :currentAccountId")
    List<Account> findByFavoriteMovieAndFavoriteGenre(
        @Param("movieId") Integer movieId,
        @Param("genreId") Integer genreId,
        @Param("currentAccountId") Integer currentAccountId);

    // @Query("FROM account WHERE username = :usernameVar AND password =
    // :passwordVar")
    // Account login(@Param("usernameVar") String username, @Param("passwordVar")
    // String password);

}
