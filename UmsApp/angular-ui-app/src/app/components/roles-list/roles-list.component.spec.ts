import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RolesListComponent } from './roles-list.component';
import { RolesService } from 'src/app/services/roles.service';
import { of } from 'rxjs';
import { rolesData } from 'server/roleData';

describe('RolesListComponent', () => {
  let component: RolesListComponent;
  let fixture: ComponentFixture<RolesListComponent>;
  let rolesServiceSpy: jasmine.SpyObj<RolesService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('RolesService', ['getRolesList']);

    TestBed.configureTestingModule({
      declarations: [RolesListComponent],
      providers: [{ provide: RolesService, useValue: spy }],
    });

    fixture = TestBed.createComponent(RolesListComponent);
    component = fixture.componentInstance;
    rolesServiceSpy = TestBed.inject(
      RolesService
    ) as jasmine.SpyObj<RolesService>;
  });

  it('should create the roles list component', () => {
    expect(component).toBeTruthy();
  });

  it('should call listRoles method on RolesService and update roles property with returned data', () => {
    rolesServiceSpy.getRolesList.and.returnValue(of(rolesData));
    component.ngOnInit();
    expect(rolesServiceSpy.getRolesList).toHaveBeenCalled();
    expect(component.roles).toEqual(rolesData);
  });
});
