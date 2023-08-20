import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { Users } from '../common/users';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should retrieve a list of users', () => {
    const mockUsers: Users[] = [
      {
        id: 1,
        email: 'user1@example.com',
        password: 'password1',
        firstName: 'John',
        lastName: 'Doe',
        gender: '',
        photos: null,
        enabled: false,
        roles: [],
      },
      {
        id: 2,
        email: 'user2@example.com',
        password: 'password2',
        firstName: 'Jane',
        lastName: 'Doe',
        gender: '',
        photos: null,
        enabled: false,
        roles: [],
      },
    ];

    userService.getUserList().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should retrieve a user by id', () => {
    const mockUser: Users = {
      id: 1,
      email: 'user1@example.com',
      password: 'password1',
      firstName: 'John',
      lastName: 'Doe',
      gender: '',
      photos: null,
      enabled: false,
      roles: [],
    };

    userService.getUserById(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should get a user by email', () => {
    const mockUser: Users = {
      id: 1,
      email: 'user1@example.com',
      password: 'password1',
      firstName: 'John',
      lastName: 'Doe',
      gender: '',
      photos: null,
      enabled: false,
      roles: [],
    };

    userService.getUserByEmail('user1@example.com').subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/users/email/user1@example.com'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a user', () => {
    const mockUser: Users = {
      id: 1,
      email: 'user1@example.com',
      password: 'password1',
      firstName: 'John',
      lastName: 'Doe',
      gender: '',
      photos: null,
      enabled: false,
      roles: [],
    };

    userService.createUser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should check if an email exists', () => {
    const enteredEmail = 'user1@example.com';
    const mockResult = true;

    userService.checkEmail(enteredEmail).subscribe((result) => {
      expect(result).toBe(mockResult);
    });

    const req = httpMock.expectOne(
      `http://localhost:8080/api/users/check-email?email=${enteredEmail}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResult);
  });

  it('should get an image', () => {
    const email = 'user1@example.com';
    const mockBlob = new Blob(['test'], { type: 'image/jpeg' });

    userService.getImage(email).subscribe((image) => {
      expect(image).toEqual(mockBlob);
    });

    const req = httpMock.expectOne(
      `http://localhost:8080/api/users/viewImage/${email}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockBlob);
  });

  it('should update a profile picture', () => {
    const formData = new FormData();
    formData.append('image', new Blob(['test'], { type: 'image/jpeg' }));
    const email = 'user1@example.com';

    userService.updateProfilePic(formData, email).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `http://localhost:8080/api/users/updateImage/${email}`
    );
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should delete a profile picture', () => {
    const email = 'user1@example.com';

    userService.deleteProfilePic(email).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `http://localhost:8080/api/users/deleteImage/${email}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a user', () => {
    const id = 1;
    const user: Users = {
      id: 1,
      email: 'user1@example.com',
      password: 'password1',
      firstName: 'John',
      lastName: 'Doe',
      gender: '',
      photos: null,
      enabled: false,
      roles: [],
    };

    userService.updateUser(id, user).subscribe((updatedUser) => {
      expect(updatedUser).toEqual(user);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/users/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(user);
  });

  // it('should delete a user', () => {
  //   const id = 1;

  //   userService.deleteUser(id).subscribe((response) => {
  //     expect(response).toBeUndefined();
  //   });

  //   const req = httpMock.expectOne(`http://localhost:8080/api/users/${id}`);
  //   expect(req.request.method).toBe('DELETE');
  //   req.flush({});
  // });
});
