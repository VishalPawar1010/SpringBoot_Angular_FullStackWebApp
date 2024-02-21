package com.growth10Mindset.admin.security.config;

import com.growth10Mindset.admin.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private AuthenticationProvider authenticationProvider;

    @Autowired
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, AuthenticationProvider authenticationProvider) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.cors().and().csrf().disable();

		http.authorizeRequests()
		
		.antMatchers("/api/login","/api/logout","/api/users/forgotpassword","/api/users/updatepassword/**","/api/users/verify_otp/**","/graphql/**").permitAll()
		.antMatchers("/api/roles").hasAnyAuthority("SuperAdmin","Admin")
		.antMatchers("/api/**").hasAuthority("SuperAdmin")
		.antMatchers("/home").authenticated()
		;


        http
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/api/login?logout")
                .invalidateHttpSession(true)
                .deleteCookies("Token");

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

//	private String[] getServices(String location) {
//		InputStream fileStream = TypeReference.class.getResourceAsStream(location);
//		ObjectMapper mapper = new ObjectMapper();
//		List<String> urlList = new ArrayList<>();
//		try {
//			urlList = mapper.readValue(fileStream, ArrayList.class);
//		} catch (StreamReadException e) {
//			throw new RuntimeException(e);
//		} catch (DatabindException e) {
//			throw new RuntimeException(e);
//		} catch (IOException e) {
//			throw new RuntimeException(e);
//		}
//
//		return urlList.stream().toArray(String[]::new);
//	}
}
