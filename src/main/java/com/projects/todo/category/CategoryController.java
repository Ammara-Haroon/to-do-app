package com.projects.todo.category;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projects.todo.exceptions.NotFoundException;
import com.projects.todo.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/categories")
public class CategoryController {

  Logger logger = LoggerFactory.getLogger(CategoryController.class);
  @Autowired
  CategoryService categoryService;

  @PostMapping()
  public ResponseEntity<Category> createCategory(@Valid @RequestBody CreateCategoryDTO data) {
    Category createdCategory = this.categoryService.create(data);
    return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
  }

  @GetMapping()
  public ResponseEntity<List<Category>> findAllCategorys() {
    List<Category> allCategorys = this.categoryService.findAll();
    logger.info("Getting All Categorys");
    return new ResponseEntity<>(allCategorys, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Category> findCategoryById(@PathVariable Long id) throws NotFoundException {
    Optional<Category> maybeCategory = this.categoryService.findById(id);
    Category foundCategory = maybeCategory.orElseThrow(() -> new NotFoundException(Category.class, id));
    logger.info(String.format("Finding Category with id %s", id));
    return new ResponseEntity<>(foundCategory, HttpStatus.OK);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Category> updateCategoryById(@PathVariable Long id, @Valid @RequestBody UpdateCategoryDTO data)
      throws NotFoundException {
    Optional<Category> maybeCategory = this.categoryService.updateById(id, data);
    Category updatedCategory = maybeCategory.orElseThrow(() -> new NotFoundException(Category.class, id));
    logger.info(String.format("Updating Category with id %s", id));
    return new ResponseEntity<>(updatedCategory, HttpStatus.OK);

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCategoryById(@PathVariable Long id) throws NotFoundException {
    try {
      this.categoryService.deleteById(id);
    } catch (ServiceValidationException e) {
      throw new NotFoundException(Category.class, id);
    }
    logger.info(String.format("Deleting Category with id %s", id));
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
