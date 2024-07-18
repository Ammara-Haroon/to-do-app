package com.projects.todo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  public void addCorsMappings(CorsRegistry registry) {
    String[] allowedOrigins = { "https://todo-uublo3ikqq-uc.a.run.app","https://todo-uublo3ikqq-uc.a.run.app/","http://localhost:5173/", "http://127.0.0.1:5173" };
    registry.addMapping("/**").allowedOrigins(allowedOrigins).allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
        .allowedHeaders("*");
  }
}