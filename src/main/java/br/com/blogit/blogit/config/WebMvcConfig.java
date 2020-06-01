package br.com.blogit.blogit.config;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import javax.servlet.ServletContext;

@EnableWebMvc
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Bean
    public ViewResolver viewResolver(ApplicationContext applicationContext, ServletContext servletContext) {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();

        viewResolver.setApplicationContext(applicationContext);
        viewResolver.setServletContext(servletContext);
        viewResolver.setPrefix("/WEB-INF/views/");
        viewResolver.setSuffix(".jsp");

        return viewResolver;
    }
}
