package com.luv2code.ecommerce.security.dao;


import io.jsonwebtoken.lang.Objects;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
//@AllArgsConstructor
//@NoArgsConstructor
public class AuthenticationResponse {

    private String token;

    public static AuthenticationResponseBuilder builder() {
        return new AuthenticationResponseBuilder();
    }

    public static class AuthenticationResponseBuilder {
        private String token;

        private AuthenticationResponseBuilder() {
        }

        public AuthenticationResponseBuilder token(String token) {
            this.token = token;
            return this;
        }

        public AuthenticationResponse build() {
            return new AuthenticationResponse(token);
        }
    }

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	

	public AuthenticationResponse() {
//		super();
	}

	public AuthenticationResponse(String token) {
		super();
		this.token = token;
	}

	@Override
	public int hashCode() {
		return Objects.nullSafeHashCode(token);
	}

//	@Override
//	public boolean equals(Object obj) {
//		if (this == obj)
//			return true;
//		if (obj == null)
//			return false;
//		if (getClass() != obj.getClass())
//			return false;
//		AuthenticationResponse other = (AuthenticationResponse) obj;
//		return Objects.equals(token, other.token);
//	}

//	@Override
//	public String toString() {
//		return "AuthenticationResponse [token=" + token + ", getToken()=" + getToken() + ", hashCode()=" + hashCode()
//				+ ", getClass()=" + getClass() + ", toString()=" + super.toString() + "]";
//	}


    
}