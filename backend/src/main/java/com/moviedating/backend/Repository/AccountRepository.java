package com.moviedating.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moviedating.backend.Entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findByUsername(String username);

    // @Query("FROM account WHERE username = :usernameVar AND password =
    // :passwordVar")
    // Account login(@Param("usernameVar") String username, @Param("passwordVar")
    // String password);

}
