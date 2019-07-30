package com.exadel.carpoolfree.config;

import com.exadel.carpoolfree.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/api/passenger/**").hasAuthority("PASSENGER") //Test Controller
                .antMatchers("/api/admin/**").hasAuthority("ADMIN") //Test Controller
                .antMatchers("/api/driver/**").hasAuthority("DRIVER") //Test Controller
                .antMatchers("/main").authenticated()
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .successHandler(successHandler())
                .loginPage("/login")
                .permitAll()
                .and()
                .logout()
                .permitAll()
        ;
        http.headers().frameOptions().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
    }

    private AuthenticationSuccessHandler successHandler() {
        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                                                HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {

                SecurityContext context = SecurityContextHolder.getContext();
                httpServletResponse.setStatus(200);
                //httpServletResponse.sendRedirect("/login");
                httpServletResponse.getWriter().println(context.getAuthentication().getName());
                httpServletResponse.getWriter().println(context.getAuthentication().getAuthorities());

                httpServletResponse.addHeader(context.getAuthentication().getName(), context.getAuthentication().getAuthorities().toString());
            }
        };
    }

    /* UNCOMMENT TO DISABLE SPRING SECURITY */
    @Configuration
    @Order(1)
    public static class DisableSecurityConfigurationAdapater extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .csrf().disable()
                    .antMatcher("/**").authorizeRequests().anyRequest().permitAll();
            http.headers().frameOptions().disable();
        }
    }
}
