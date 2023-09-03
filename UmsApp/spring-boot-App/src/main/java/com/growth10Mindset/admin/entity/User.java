package com.growth10Mindset.admin.entity;

import java.util.HashSet;
import java.util.Set;

//
import javax.persistence.*;
import javax.validation.constraints.*;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
//import javax.validation.constraints.Email;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.NotNull;
//import javax.validation.constraints.Pattern;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 128, nullable = false, unique = true)
	@NotEmpty(message = "Email is required")
	@NotNull(message = "Email should not be null")
    @Email(message = "Invalid email format")
	private String email;

	@Column(length = 64, nullable = false)
	@NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "Password must contain at least one alphabetical character, one digit, one special character, and be at least 8 characters long.")
	private String password;

	@Column(name = "first_name", length = 45, nullable = false)
	@Size(min=2, message= "firstName must be at least 2 characters long")
	@NotBlank(message = "First Name is required")
    @Pattern(regexp = "^[A-Z][a-zA-Z]*$", message = "First Name should start with a capital letter and contain only alphabets.")
	private String firstName;

	@Column(name = "last_name", length = 45, nullable = false)
	@Size(min=2, message= "Lenth must be greater than 1")
	@NotBlank(message = "Last Name is required")
    @Pattern(regexp = "^[A-Z][a-zA-Z]*$", message = "Last Name should start with a capital letter and contain only alphabets.")
	private String lastName;
	
    @Column(name="gender", length = 45, nullable = false)
    @NotBlank(message = "Gender is required")
    private String gender;


	@Lob
	@Column(name = "photos", columnDefinition = "LONGBLOB")
	private byte[] photos;

	@Transient
	private MultipartFile photoFile;

	private boolean enabled;

	@ManyToMany
	@JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	@Fetch(FetchMode.JOIN)
    @NotEmpty(message = "At least one role is required")
    @Size(min = 1, message = "At least one role is required")
	private Set<Role> roles = new HashSet<>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public byte[] getPhotos() {
		return photos;
	}

	public void setPhotos(byte[] photos) {
		this.photos = photos;
	}

	public MultipartFile getPhotoFile() {
		return photoFile;
	}

	public void setPhotoFile(MultipartFile photoFile) {
		this.photoFile = photoFile;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public void addRole(Role role) {
		this.roles.add(role);
	}
	
	public User() {
	}
	
	public User(Integer id, String email, String password, String firstName, String lastName, String gender,
			boolean enabled, Set<Role> roles) {
//		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.enabled = enabled;
		this.roles = roles;
	}




//	public User(
//			String email,
//			String password,
//			Set<Role> roles) {
//		super();
//		this.email = email;
//		this.password = password;
//		this.roles = roles;
//	}

	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", password=" + password + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", gender=" + gender + ", enabled=" + enabled + ", roles=" + roles + "]";
	}

	
}
