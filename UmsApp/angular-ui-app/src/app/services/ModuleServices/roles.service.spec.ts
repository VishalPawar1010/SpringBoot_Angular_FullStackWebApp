import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RolesService } from './roles.service';
import { rolesData } from 'server/roleData';

describe('RolesService', () => {
  let service: RolesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RolesService],
    });
    service = TestBed.inject(RolesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve roles list from the API', () => {
    service.getRolesList().subscribe((roles) => {
      expect(roles).toEqual(rolesData);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/roles');
    expect(req.request.method).toBe('GET');
    req.flush({ _embedded: { roles: rolesData } });
  });
});
