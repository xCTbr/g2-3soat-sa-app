import useCaseCreate from "../../use_cases/category/add.js";
import useCaseUpdateById from "../../use_cases/category/updateById.js";
import useCasegetAll from '../../use_cases/category/getAll.js'
import useCaseFindById from '../../use_cases/category/findById.js';
import useCasedelete from '../../use_cases/category/deleteById.js'
import CategoryGateway from '../../application/categoryGateway.js';
import category from "../../entities/Category.js";
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
	/*jest.mock('../../application/categoryGateway.js', () => ({
		add: jest.fn(), // Mocking the add method
		findById: jest.fn(), // Mocking the findby id
		updateById: jest.fn(), // Mocking the update by id
		//findAll: jest.fn() // Mocking the add method
	}));*/

	jest.mock("../../application/categoryGateway.js", () => ({
		__esModule: true,
		default: {
		  findById: jest.fn(),
		  updateById: jest.fn(),
		},
	  }));
	  

	it('Adicionar nova categoria', async () => {
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

	it('Busca categoria por id', async () => {
        // Define test data
		const id = '999';
        
        // Call the function
        await useCaseFindById(id);

        // Verify that gateway.add is called with the correct parameters
        expect(CategoryGateway().findById).toHaveBeenCalledWith(id);
    });
	it('Busca todas as categoria', async () => {
        // Call the function
        await useCasegetAll();

        // Verify that gateway.add is called with the correct parameters
        expect(CategoryGateway().findAll).toHaveBeenCalledWith();
    });

	/*test('Atualiza categoria', async () => {
        // Define test data
		const id = '999';
        const categoryName = 'Test Category';
        const description = 'Test Description';
        const updatedAt = '2024-05-01';
		const updatedCategory = category(categoryName, description, updatedAt);

		 // Mock the found category
		 const foundCategory = {
            id: id,
            categoryName: categoryName,
            description: description,
            updatedAt: updatedAt
        };
		console.log("resposta");
		// Mocking findById to resolve with an existing category
		//CategoryGateway().findById.mockResolvedValue(foundCategory);
        // Call the function
        //await useCaseUpdateById(id, categoryName, description, updatedAt);
		// Call the function
		const result = await useCaseUpdateById(id, categoryName, description, updatedAt);

		// Verify that categoryGateway.findById is called with the correct id
        //expect(CategoryGateway().findById).toHaveBeenCalledWith(id);
		//useCaseUpdateById
        // Verify that categoryGateway.updateById is called with the correct id and updated category
        expect(CategoryGateway().updateById).toHaveBeenCalledWith(id, updatedCategory);
		console.log(result);
		// Verify the result
        expect(result.response).toEqual("Category updated");
        // Verify that gateway.add is called with the correct parameters
        //expect(CategoryGateway().updateById).toHaveBeenCalledWith(id,category(categoryName, description, updatedAt));
    });*/
	it('Atualiza categoria pendente de valores', async () => {
        // Define test data
		const id = '999';
        const categoryName = '';
        const description = '';
        const updatedAt = '2024-05-01';
		//const updatedCategory = category(categoryName, description, updatedAt);

		const result = await useCaseUpdateById(id, categoryName, description, updatedAt);
        // Verify that categoryGateway.updateById is called with the correct id and updated category
        //expect(CategoryGateway().updateById).toHaveBeenCalledWith(id, updatedCategory);
		
		// Verify the result
        expect(result).toEqual("Category name and Description fields are mandatory");
        // Verify that gateway.add is called with the correct parameters
        //expect(CategoryGateway().updateById).toHaveBeenCalledWith(id,category(categoryName, description, updatedAt));
    });
	/*test('Atualiza categoria id nao encontrado', async () => {
        // Define test data
		const id = '00';
        const categoryName = '';
        const description = 'Test Description';
        const updatedAt = '2024-05-01';
		const updatedCategory = category(categoryName, description, updatedAt);

		const result = await useCaseUpdateById(id, categoryName, description, updatedAt);
        // Verify that categoryGateway.updateById is called with the correct id and updated category
        expect(CategoryGateway().updateById).toHaveBeenCalledWith(id, updatedCategory);
		
		// Verify the result
        expect(result).toEqual(updatedCategory);
        
    });*/

	
	it("Atualiza categoria", async () => {	  
		const id = "999";
		const categoryName = "Updated Category";
		const description = "Updated description";
		const updatedAt = "2024-05-01";
	  
		const updatedCategory = {
		categoryName: categoryName,
		description: description,
		updatedAt: updatedAt
		};
	  
		// Mocking findById to resolve with an existing category
		//jest.spyOn(CategoryGateway(), "findById").mockResolvedValue(existingCategory);
		//jest.spyOn(CategoryGateway(), "updateById").mockResolvedValue(existingCategory);
		// Call the function being tested
		await useCaseUpdateById(id, categoryName, description, updatedAt);
	
		// Assertions
		expect(CategoryGateway().updateById).toHaveBeenCalledWith(id,updatedCategory);
		// Add expectations for the updated category object if needed
		  
	});
	it("Deleta categoria", async () => {	  
		const id = "999";
		
		await useCasedelete(id);
	
		// Assertions
		expect(CategoryGateway().deleteById).toHaveBeenCalledWith(id);
		// Add expectations for the updated category object if needed
		  
	});
	  
});