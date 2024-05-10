
import createCategory from "../../use_cases/category/add.js";
import categoryGateway from "../../application/categoryGateway.js";
import deleteById from "../../use_cases/category/deleteById.js";
import updateCategoryById from "../../use_cases/category/updateById.js";
import findCategoryById from "../../use_cases/category/findById.js"
import category from "../../entities/Category.js";

jest.mock("../../application/categoryGateway.js");
jest.mock("../../entities/Category.js");

describe("Use Case Category", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Add - should return an error message if categoryName or description is empty", async () => {
    const errorMessage = "Category Name and Description fields cannot be empty";

    // Test empty categoryName
    const result = await createCategory("", "Description", new Date(), new Date());
    expect(result).toBe(errorMessage);

    // Test empty description
    const result2 = await createCategory("Category", "", new Date(), new Date());
    expect(result2).toBe(errorMessage);
  });

  it("Add -should call categoryGateway().add with the correct parameters", async () => {
    const categoryName = "Test Category";
    const description = "Test Description";
    const createdAt = new Date();
    const updatedAt = new Date();
    
    const mockCategory = { /* mock category object */ };

    // Mock category creation
    category.mockReturnValue(mockCategory);

    // Mock categoryGateway.add method
    const mockAdd = jest.fn();
    categoryGateway.mockReturnValue({ add: mockAdd });

    // Call createCategory
    createCategory(categoryName, description, createdAt, updatedAt);

    // Verify category creation was called with correct parameters
    expect(category).toHaveBeenCalledWith(categoryName, description, createdAt, updatedAt);
    
    // Verify categoryGateway.add was called with the mock category object
    expect(mockAdd).toHaveBeenCalledWith(mockCategory);
  });
  it("Update - should return an error message if categoryName or description is empty", async () => {
    const errorMessage = "Category name and Description fields are mandatory";

    // Test empty categoryName
    const result = await updateCategoryById("1","", "Description", new Date());
    expect(result).toBe(errorMessage);

    // Test empty description
    const result2 = await updateCategoryById(1,"Category", "", new Date());
    expect(result2).toBe(errorMessage);
  });

  it("Update -should call categoryGateway().add with the correct parameters", async () => {
    const id = 1;
    const categoryName = "Test Category";
    const description = "Test Description";
    //const createdAt = new Date();
    const updatedAt = new Date();
    
    const mockCategory = { categoryName, description, updatedAt };

    // Mock category creation
    category.mockReturnValue(mockCategory);

    // Mock categoryGateway.add method
    const mockUpdate = jest.fn();
    categoryGateway.mockReturnValue({ updateById: mockUpdate });

    // Call updateCategoryById
    updateCategoryById(id, categoryName, description, updatedAt);

    // Verify category creation was called with correct parameters
    expect(category).toHaveBeenCalledWith(categoryName, description, updatedAt);
    
    // Verify categoryGateway.add was called with the mock category object
    expect(categoryGateway().updateById).toHaveBeenCalledWith(id, mockCategory);
  });
  it("should call deleteById with the id", () => {
    const id = 1;
    
    const mockCategory = { /* mock category object */ };


    //categoryGateway.mockReturnValue({ deleteById: mockAdd });
    // Mock categoryGateway.add method
    const mockDelete = jest.fn();
    categoryGateway.mockReturnValue({ deleteById: mockDelete });

    deleteById(id);
    expect(categoryGateway().deleteById).toHaveBeenCalledWith(id);
  });

  it("should call find with the id", () => {
    const id = 1;
    
    const mockCategory = { /* mock category object */ };
    //categoryGateway.mockReturnValue({ deleteById: mockAdd });
    // Mock categoryGateway.add method
    const mockFindById = jest.fn();
    categoryGateway.mockReturnValue({ findById: mockFindById });

    findCategoryById(id);
    expect(categoryGateway().findById).toHaveBeenCalledWith(id);
  });

});
