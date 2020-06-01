package br.com.blogit.blogit.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;

@Controller
@RequestMapping
public class WelcomeController {
    @GetMapping("/welcome")
    public ModelAndView welcome(@RequestParam(name = "name", required = false, defaultValue = "") String name) {
        HashMap<String, String> model = new HashMap<>();
        model.put("name", name);
        return new ModelAndView("welcome", model);
    }
}
