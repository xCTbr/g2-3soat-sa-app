import useCaseCreate from "../../use_cases/category/add.js";
import useCaseUpdateById from "../../use_cases/category/updateById.js";
import useCasegetAll from '../../use_cases/category/getAll.js'
import useCaseFindById from '../../use_cases/category/findById.js';
import useCasedelete from '../../use_cases/category/deleteById.js'
import CategoryGateway from '../../application/categoryGateway.js';
import category from "../../entities/Category.js";
import updateById from "../../use_cases/category/updateById.js";
describe("Testes do Category Controller", () => {
	
	const objetoCategory = {
		categoryName: 'CDC',
		description: 'Sao Paulo',
		createdAt: '2024-01-01 00:00',
		updatedAt: '2024-01-01 00:00',
	  };

	it('Deve instanciar uma nova categoria', () => {
		const category = new useCaseCreate(objetoCategory);
	
		expect(category).toEqual(
		  expect.objectContaining(objetoCategory),
		);
	  });

	// Mock categoryGateway if needed
	const mockCategory = jest.mock('../../application/categoryGateway.js', () => ({
		add: jest.fn(), // Mocking the add method
		findById: jest.fn(), // Mocking the add method
		updateById: jest.fn(), // Mocking the add method
		//findAll: jest.fn() // Mocking the add method
	}));

	test('Adicionar nova categoria', async () => {
        // Define test data
        const categoryName = 'Test Category';
        const description = 'Test Description';
        const createdAt = '2024-05-01';
        const updatedAt = '2024-05-01';
        
        // Call the function
        await useCaseCreate(categoryName, description, createdAt, updatedAt);

        // Verify that gateway.add is called with the correct parameters
        expect(CategoryGateway().add).toHaveBeenCalledWith(category(categoryName, description, createdAt, updatedAt));
    });

	test('Busca categoria por id', async () => {
        // Define test data
		const id = '999';
        
        // Call the function
        await useCaseFindById(id);

        // Verify that gateway.add is called with the correct parameters
        expect(CategoryGateway().findById).toHaveBeenCalledWith(id);
    });
	test('Busca todas as categoria', async () => {
        // Call the function
        await useCasegetAll();

        // Verify that gateway.add is called with the correct parameters
        expect(CategoryGateway().findAll).toHaveBeenCalledWith();
    });

	test('Atualiza categoria', async () => {
        // Define test data
		const id = '999';
        const categoryName = 'Test Category';
        const description = 'Test Description';
        const updatedAt = '2024-05-01';
		const updatedCategory = category(categoryName, description, updatedAt);

		 // Mock the found category
		 const foundCategory = {
            id: id,
            categoryName: 'Initial Category',
            description: 'Initial Description',
            updatedAt: '2024-04-01'
        };
		console.log("resposta");

        //console.log(foundCategory);
		// Mock categoryGateway.findById to resolve with found category
		mockCategory.findById.mockResolvedValue(foundCategory);
			
		// Mock categoryGateway.updateById
		mockCategory.updateById.mockResolvedValue(updatedCategory);

        // Call the function
        //await useCaseUpdateById(id, categoryName, description, updatedAt);
		// Call the function
		const result = await useCaseUpdateById(id, category(categoryName, description, updatedAt));

		// Verify that categoryGateway.findById is called with the correct id
        expect(CategoryGateway().findById).toHaveBeenCalledWith(id);
		//useCaseUpdateById
        // Verify that categoryGateway.updateById is called with the correct id and updated category
        expect(CategoryGateway().updateById).toHaveBeenCalledWith(id, updatedCategory);
		
		// Verify the result
        expect(result).toEqual(updatedCategory);
        // Verify that gateway.add is called with the correct parameters
        //expect(CategoryGateway().updateById).toHaveBeenCalledWith(id,category(categoryName, description, updatedAt));
    });
	
});