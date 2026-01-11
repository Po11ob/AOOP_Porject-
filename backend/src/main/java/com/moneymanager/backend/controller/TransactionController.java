package com.moneymanager.backend.controller;

import com.moneymanager.backend.model.Transaction;
import com.moneymanager.backend.repository.TransactionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @GetMapping
    public List<Transaction> list() {
        return transactionRepository.findAll();
    }

    @PostMapping
    public Transaction create(@RequestBody Transaction t) {
        return transactionRepository.save(t);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> update(@PathVariable Long id, @RequestBody Transaction t) {
        return transactionRepository.findById(id).map(existing -> {
            existing.setAmount(t.getAmount());
            existing.setDescription(t.getDescription());
            existing.setDate(t.getDate());
            existing.setType(t.getType());
            existing.setCategory(t.getCategory());
            return ResponseEntity.ok(transactionRepository.save(existing));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        transactionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
