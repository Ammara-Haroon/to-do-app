package com.projects.todo.category;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.projects.todo.exceptions.ServiceValidationException;
import com.projects.todo.exceptions.ValidationErrors;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoryService {
  @Autowired
  private ModelMapper mapper;

  @Autowired
  private CategoryRepository repo;

  public Category create(CreateCategoryDTO data) {
    Category newCategory = mapper.map(data, Category.class);
    return this.repo.save(newCategory);
  }

  public List<Category> findAll() {
    if(this.repo.count() == 0) setupDefaultCategories();
    
    return this.repo.findAll(Sort.by("name").ascending());
  }

  private void setupDefaultCategories() {
    Map<String,String> defaultCategories = new HashMap<String,String>();
    defaultCategories.put("Home","/src/assets/home-icon.png");
    defaultCategories.put("Office","/src/assets/briefcase-icon.png");
    defaultCategories.put("Shopping","/src/assets/basket-icon.png");
    defaultCategories.put("Urgent","/src/assets/siren-icon.png");
  
    for(Map.Entry<String,String>entry : defaultCategories.entrySet()){
      Category newCategory = new Category();
      newCategory.setName(entry.getKey());
      newCategory.setIcon(entry.getValue());
      this.repo.save(newCategory);
    }
  }
  

  public Optional<Category> findById(Long id) {
    return this.repo.findById(id);
  }

  public void deleteById(Long id) throws ServiceValidationException {
    ValidationErrors errors = new ValidationErrors();
    Optional<Category> maybeCategory = this.findById(id);
    if (maybeCategory.isEmpty()) {
      errors.addError("Category", String.format("Category with id %s does not exist", id));
      throw new ServiceValidationException(errors);
    }
    this.repo.delete(maybeCategory.get());
  }

  public Optional<Category> updateById(Long id, UpdateCategoryDTO data) {
    Optional<Category> maybeCategory = this.findById(id);
    if (maybeCategory.isEmpty()) {
      return maybeCategory;
    }

    Category foundCategory = maybeCategory.get();
    mapper.map(data, foundCategory);
    Category updatedCategory = this.repo.save(foundCategory);
    return Optional.of(updatedCategory);
  }

}
