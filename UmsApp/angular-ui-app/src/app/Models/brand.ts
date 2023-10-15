import { Category } from "./category";

export class Brand {
  constructor(
    public id: number,
    public brandName: string,
    public brandLogo: any,
    public categories: Category[]
  ) {}
}
