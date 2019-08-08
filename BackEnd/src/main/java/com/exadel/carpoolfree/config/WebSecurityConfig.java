package com.exadel.carpoolfree.config;

import com.exadel.carpoolfree.model.view.UserVO;
import com.exadel.carpoolfree.service.UserDetailsServiceImpl;
import com.exadel.carpoolfree.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
    private final UserService userService;

    public WebSecurityConfig(UserService userService) {
        this.userService = userService;
    }

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
                .antMatchers("/api/users/admin").hasAuthority("ADMIN")
                .antMatchers("/api/users").authenticated()
                .antMatchers("/api/drive/userId/{userId}").authenticated()
                .antMatchers("/api/drive/driver/**").hasAuthority("DRIVER")
                .antMatchers("/api/drive/passenger/**").hasAuthority("PASSENGER")
                .antMatchers("/api/socket/**").authenticated()
                .antMatchers("/api/car/**").authenticated()
                .antMatchers("/api/passengerDrive/passenger/**").hasAuthority("PASSENGER")
                .antMatchers("/api/passengerDrive/driver/**").hasAuthority("DRIVER")
                .antMatchers("/main").authenticated()
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .successHandler(successHandler())
                .loginPage("/login")
                .permitAll()
                .and()
                .logout()
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
        ;
        http.headers().frameOptions().disable();
    }

//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        web
//                .ignoring()
//                .antMatchers("/static/**");
//    }

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

                httpServletResponse.getWriter().println(context.getAuthentication().getName());
                httpServletResponse.getWriter().println(context.getAuthentication().getAuthorities());

                String login = context.getAuthentication().getName();
                UserVO userVO = userService.findUserByLogin(login);

                System.out.println(userVO);
                httpServletResponse.getWriter().println(userVO);
                httpServletResponse.addHeader(context.getAuthentication().getName(), context.getAuthentication().getAuthorities().toString());

                httpServletResponse.sendRedirect("/main");
            }
        };
    }

    /* UNCOMMENT TO DISABLE SPRING SECURITY */
//    @Configuration
//    @Order(1)
//    public static class DisableSecurityConfigurationAdapater extends WebSecurityConfigurerAdapter {
//        @Override
//        protected void configure(HttpSecurity http) throws Exception {
//            http
//                    .csrf().disable()
//                    .antMatcher("/**").authorizeRequests().anyRequest().permitAll();
//            http.headers().frameOptions().disable();
//        }
//    }
}
