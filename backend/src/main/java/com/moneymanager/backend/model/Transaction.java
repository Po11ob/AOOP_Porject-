package com.moneymanager.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double amount;
    private String description;
    private LocalDate date;
    @Enumerated(EnumType.STRING)
    private Type type;
    @ManyToOne
    private Category category;

    public enum Type { INCOME, EXPENSE }
}
