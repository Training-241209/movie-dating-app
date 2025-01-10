package com.moviedating.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moviedating.backend.Entity.Account;
import com.moviedating.backend.Service.AccountService;
import com.moviedating.backend.Service.jwtService;
import com.moviedating.backend.dtos.FavoritesDTO;

@RestController
@RequestMapping("/account")
public class AccountController {
    
    @Autowired
    AccountService accountService;
    @Autowired
    jwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<Account> registerAccount(@RequestBody Account account) {
        Account registeredAccount = accountService.registerAccount(account);

        if (registeredAccount != null) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Account account) {
        Account loggedInAccount = accountService.login(account.getUsername(), account.getPassword());

        if (loggedInAccount != null) {
            String token = jwtService.generateToken(loggedInAccount);
            return ResponseEntity.status(HttpStatus.OK).body(token);
        } else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/choose-favorites")
    public ResponseEntity<String>  chooseFavorites(
        @RequestBody FavoritesDTO favorites,
        @RequestHeader(name ="Authorization") String authHeader) {

            String token = authHeader.replace("Bearer ", "");

            Account extractedAccount = jwtService.decodeToken(token);
            String username = extractedAccount.getUsername();

            accountService.saveLikes(username, favorites.getGenreId(), favorites.getMovieId());

            return ResponseEntity.ok("User's liked genre and movie updated successfully!");
        }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteAccount(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        accountService.deleteAccount(token);
        return ResponseEntity.ok("Account has been deleted");
    }

}
