package com.moviedating.backend.Service;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moviedating.backend.Entity.Account;
import com.moviedating.backend.Repository.AccountRepository;

@Service
public class AccountService {
    private AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

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
}
