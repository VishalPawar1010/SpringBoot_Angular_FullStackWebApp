import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/Models/roles';
import { RolesService } from 'src/app/services/ModuleServices/roles.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css'],
})
export class RolesListComponent implements OnInit {
  roles: Roles[] = [];

  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {
    this.listRoles();
  }
  listRoles() {
    this.rolesService.getRolesList().subscribe((data) => {
      this.roles = data;
    });
  }
}
