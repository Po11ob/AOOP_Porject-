package com.moneymanager.backend.controller;

import com.moneymanager.backend.model.Category;
import com.moneymanager.backend.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<Category> list() {
        return categoryRepository.findAll();
    }

    @PostMapping
    public Category create(@RequestBody Category c) {
        return categoryRepository.save(c);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@PathVariable Long id, @RequestBody Category c) {
        return categoryRepository.findById(id).map(existing -> {
            existing.setName(c.getName());
            existing.setType(c.getType());
            return ResponseEntity.ok(categoryRepository.save(existing));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
