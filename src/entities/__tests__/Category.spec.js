import Category from "../../entities/Category.js";

describe("Entity Category", () => {
	
	const objetoCategory = {
		categoryName: 'CDC',
		description: 'Sao Paulo',
		createdAt: '2024-01-01 00:00',
		updatedAt: '2024-01-01 00:00',
		};	
	
	it('Deve instanciar uma nova categoria', () => {
		// Create a category instance
		const category = new Category(objetoCategory);
		expect(category).toEqual(
		  expect.objectContaining(category),
		);
	  });
	it('should return correct category name', () => {
		// Create a category instance
		const testCategory = Category(objetoCategory);
		expect(testCategory.getCategoryName()).toBe(testCategory.getCategoryName());
	  });
	it('should return correct description', () => {
		// Create a category instance
		const testCategory = Category(objetoCategory);
		expect(testCategory.getDescription()).toBe(testCategory.getDescription());
	});

	it('should return correct createdAt date', () => {
		// Create a category instance
		const testCategory = Category(objetoCategory);
		expect(testCategory.getCreatedAt()).toBe(testCategory.getCreatedAt());
	});

	it('should return correct updatedAt date', () => {
		// Create a category instance
		const testCategory = Category(objetoCategory);
		expect(testCategory.getUpdatedAt()).toBe(testCategory.getUpdatedAt());
	});
});