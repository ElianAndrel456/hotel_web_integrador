package com.hotel.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.hotel.server.middleware.RolMiddleware;

@Configuration
public class AppConfig implements WebMvcConfigurer {
  private final RolMiddleware rolMiddleware;

  public AppConfig(RolMiddleware rolMiddleware) {
    this.rolMiddleware = rolMiddleware;
  }

  @Override
  public void addInterceptors(org.springframework.web.servlet.config.annotation.InterceptorRegistry registry) {
    registry.addInterceptor(rolMiddleware).addPathPatterns("/api/get_all_clients");
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    WebMvcConfigurer.super.addCorsMappings(registry);
    registry.addMapping("/**").allowedMethods("*").allowedOrigins("*");
  }
}
