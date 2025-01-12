package com.moviedating.backend.Service;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moviedating.backend.Entity.Account;
import com.moviedating.backend.Entity.enums.GenderType;
import com.moviedating.backend.Repository.AccountRepository;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
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

    public void saveLikes(String username, Integer genreId, Integer movieId) {
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Account cannot be found"));

        account.setFavoriteGenre(genreId);
        account.setFavoriteMovie(movieId);

        accountRepository.save(account);
    }

        public void updateGenderAndPreference(Account user, GenderType genderPreference, GenderType gender){
        user.setGenderPreference(genderPreference);    
        user.setGender(gender);
        accountRepository.save(user);
        }

    public Account fillAccountInfo(Account account) {
        Optional<Account> accountFromDb = accountRepository.findByUsername(account.getUsername());
        if (accountFromDb.isPresent())
            return accountFromDb.get();
        else
            return null;
    }

}
