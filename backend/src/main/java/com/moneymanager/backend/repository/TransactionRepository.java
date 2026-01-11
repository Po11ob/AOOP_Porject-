package com.moneymanager.backend.repository;

import com.moneymanager.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
