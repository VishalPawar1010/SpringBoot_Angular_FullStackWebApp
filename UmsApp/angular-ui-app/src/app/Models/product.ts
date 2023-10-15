import { Brand } from "./brand";
import { Category } from "./category";

export class Product {
  constructor(
    public id: number,
    public productName: string,
    public productImg: string,
    public brand: Brand,
    public category: Category
  ) {}
}
