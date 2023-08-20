import { Roles } from './roles';
export class Users {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public gender: string,
    public photos: any,
    public enabled: boolean,
    public roles: Roles[]
  ) {}
}
