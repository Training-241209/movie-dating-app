package com.moviedating.backend.Service;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moviedating.backend.Entity.Account;
import com.moviedating.backend.Repository.AccountRepository;
import com.moviedating.backend.Service.jwtService;


@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;
    jwtService jwtService;


    public Account registerAccount(Account account) {
        Optional<Account> existingAccount = accountRepository.findByUsername(account.getUsername());
        String firstName = account.getFirstName();
        String lastName = account.getLastName();
        String password = account.getPassword();

        if (existingAccount.isPresent() || firstName.trim().isEmpty() || lastName.trim().isEmpty()
                || password.trim().isEmpty()) {
            return null;
        }

        validatePassword(account.getPassword());
        validateUsername(account.getUsername());

        String hashedPass = BCrypt.hashpw(account.getPassword(), BCrypt.gensalt());
        account.setPassword(hashedPass);
        return accountRepository.save(account);
    }

    public Account login(String username, String password) {
        Optional<Account> account = accountRepository.findByUsername(username);
        if (account.isPresent() && account.get().getUsername().equals(username)
                && BCrypt.checkpw(password, account.get().getPassword())) {
            return account.get();
        } else
            return null;
    }

    public void saveLikes(String username, Integer genreId, Integer movieId){
        Account account = accountRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("Account cannot be found"));
        
        account.setFavoriteGenre(genreId);
        account.setFavoriteMovie(movieId);

        accountRepository.save(account);
    }

    public void deleteAccount(String token){
        Account account = jwtService.decodeToken(token);
        accountRepository.delete(account);
    }


    private void validateUsername(String username){
        if (username == null || username.length() < 5 || username.length() > 20) {
            throw new IllegalArgumentException("Username must be between 5 and 20 characters.");
        }
        if (!username.matches("^[a-zA-Z0-9_.-]*$")) {
            throw new IllegalArgumentException("Username can only contain letters, numbers, dots, dashes, and underscores.");
        }
    }
    
    private void validatePassword(String password) {
        if(password == null || password.length() < 8){
            throw new IllegalArgumentException("Password must be 8 characters minimum.");
        }
        if(!password.matches(".*[A-Z].*")) {
            throw new IllegalArgumentException("Password must contain an uppercase letter.");
        }
        if (!password.matches(".*[a-z].*")) {
            throw new IllegalArgumentException("Password must contain at least one lowercase letter.");
        }
        if (!password.matches(".*\\d.*")) {
            throw new IllegalArgumentException("Password must contain at least one number.");
        }
        if (!password.matches(".*[!@#$%^&*(),.?\":{}|<>].*")) {
            throw new IllegalArgumentException("Password must contain at least one special character.");
        }
    }

}
