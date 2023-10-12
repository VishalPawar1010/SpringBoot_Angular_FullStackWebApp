import { Category } from "./category";

describe('Category', () => {
  let category: Category;

  beforeEach(() => {
    category = new Category(
      1, // id
      'Category Name', // categoryName
      'description', // description
      'photo.jpg' // photos
    );
  });

  it('should create an instance of Category', () => {
    expect(category).toBeTruthy();
    expect(category.id).toEqual(1);
    expect(category.categoryName).toEqual('Category Name');
    expect(category.description).toEqual('description');
    expect(category.image).toEqual('photo.jpg');
  });
});
