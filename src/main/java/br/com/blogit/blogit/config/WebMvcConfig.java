package br.com.blogit.blogit.config;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import javax.servlet.ServletContext;

@Configuration
@EnableWebMvc
// The annotation @Configuration must to come first that @EnableWebMVc
@Description("Basic configuration")
public class WebMvcConfig implements WebMvcConfigurer {

    @Description("Defining the resource handlers")
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/styles/**").addResourceLocations("/resources/css/");
    }

    @Description("Defining the View Resolver")
    @Bean
    public ViewResolver viewResolver(ApplicationContext applicationContext, ServletContext servletContext) {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setViewClass(JstlView.class);
        viewResolver.setApplicationContext(applicationContext);
        viewResolver.setServletContext(servletContext);
        viewResolver.setPrefix("/WEB-INF/views/");
        viewResolver.setSuffix(".jsp");

        return viewResolver;
    }

}
