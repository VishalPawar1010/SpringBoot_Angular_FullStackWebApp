# MEAN_Java_FullStackWebApp
 - Project: eCommerce EMS (Employee Management System)

1. Pre-requisites for local environment setup
   1. Ubuntu : 22.04.2
   2. MySql 8.0.33
   3. MySQL Workbench
   4. SpringBoot : 2.7.2
   5. JDK - 1.8
   6. Angular : 
      1. Node : 14.1.1
      2. npm : 9.6.7
      3. Cypress : 12
      4. ng CLI : 15.2.6
   7. Maven : 3.6.6
   8. Favorite IDE : STS / Eclipse / IntelliJ 
   9. K6 (For load tests) : Html report resource- https://github.com/benc-uk/k6-reporter
   10. Code Coverage 
       1.  Jacoco 
       2.  SonarQube


- To run springboot app 
  - UmsApp/angular-ui-app
  -   `mvn clean install` -> then run java app in your fav ide

- To run angular app :
  - Go to folder UmsApp/angular-ui-app
  -  `ng serve --proxy-config src/proxy.conf.json`

### SuperAdmin credentials for login :
- UserId : vshalofficial@gmail.com
- Password : admin@123

### Environment & Tools: 
  Java, Spring, Hibernate, MySql, Angular14, Spring Rest-Services, Git, Maven.

### Description: 
 The project involved the creation of an employee management system tailored for an eCommerce platform. The system empowers SuperAdmins to efficiently create, edit, and manage user profiles with varying roles, including SuperAdmin, Admin, or Employee. Notable features of the system include form validation, pagination for handling large data sets, data migration capabilities, and the integration of unit testing for enhanced software quality.

### Responsibilities: 
- Employed JWT-based spring-security for the purpose of ensuring secure authentication and authorization.
- Created full-stack functionalities to validate forms, guaranteeing data integrity and accuracy.
- Implemented pagination feature on the user interface, thereby improving usability and performance.
- Utilized flyway to facilitate seamless data migration during application setup on new machines.
- Conducted comprehensive testing on the server-side using Junit, Jacoco, and SonarQube, and on the client-side using Karma and Cypress. The code coverage threshold was set at 80% to ensure thorough testing.
- Integrated functionality to enable the use of avatar images for user profile pictures, thereby enhancing the user experience.
- Developed the entire application using a Java-based spring architecture, ensuring a codebase that is both scalable and maintainable.
