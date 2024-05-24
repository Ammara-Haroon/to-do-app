package com.projects.todo.config;

import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.projects.todo.category.Category;
import com.projects.todo.category.CreateCategoryDTO;
import com.projects.todo.task.Task;
import com.projects.todo.task.UpdateTaskDTO;

@Configuration
public class ModelMapperConfig {
  @Bean
  public ModelMapper modelMapper() {
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setSkipNullEnabled(true);
    mapper.typeMap(String.class, String.class).setConverter(new StringTrimConverter());
    mapper.typeMap(UpdateTaskDTO.class, Task.class)
        .addMappings(m -> m.using(new StringTrimConverter()).map(UpdateTaskDTO::getDescription,
            Task::setDescription))
        .addMappings(m -> m.map(UpdateTaskDTO::getIsCompleted,
            Task::setIsCompleted))
        .addMappings(m -> m.map(UpdateTaskDTO::getDueDate,
            Task::setDueDate))
        .addMappings(m -> m.skip(Task::setCategory))
        .addMappings(m -> m.skip(UpdateTaskDTO::getCategoryId, Task::setCategory));

    return mapper;
  }

  private class StringTrimConverter implements Converter<String, String> {

    @Override
    public String convert(MappingContext<String, String> context) {
      if (context.getSource() == null) {
        return null;
      }
      return context.getSource().trim();
    }

  }
}
