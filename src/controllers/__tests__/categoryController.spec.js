import categoryController from '../categoryController.js';
import useCaseCreate from '../../use_cases/category/add.js';
import useCasegetAll from '../../use_cases/category/getAll.js';
import useCaseFindById from '../../use_cases/category/findById.js';
import useCasedelete from '../../use_cases/category/deleteById.js';
//import useCaseUpdateById from '../../use_cases/category/updateById.js';
import useCaseUpdateById from '../../use_cases/category/updateById.js'

// Mocking use case functions
jest.mock('../../use_cases/category/add.js');
jest.mock('../../use_cases/category/getAll.js');
jest.mock('../../use_cases/category/findById.js');
jest.mock('../../use_cases/category/deleteById.js');
jest.mock('../../use_cases/category/updateById.js');

// Mock the category module
jest.mock('../../entities/Category', () => {
  return jest.fn(() => ({
      getCategoryName: jest.fn(),
      getDescription: jest.fn(),
      getCreatedAt: jest.fn(),
      getUpdatedAt: jest.fn()
  }));
});
describe('Category Controller', () => {
  // Mock request, response, and next function
 
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('Add new Category', () => {
    it('should handle error during category creation', async () => {
      // Mock request body
      const req = {
        body: {
            categoryName: 'Invalid Category', // This could trigger an error in your use case
            description: 'Test Description'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(), // Mocking res.status to return itself for chaining
        json: jest.fn()
      };
      const next = jest.fn();
      // Mock useCaseCreate function to throw an error
      const errorMessage = 'Category creation failed';
      
      useCaseCreate.mockRejectedValueOnce(new Error(errorMessage));
      // Call controller function
      await categoryController().addNewCategory(req, res, next);

      // Assertions
      expect(useCaseCreate).toHaveBeenCalledTimes(1);
      
      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith(errorMessage);
      //expect(next).not.toHaveBeenCalled();
    });

    it('should add a new category successfully', async () => {
      const req = { body: { categoryName: '0Test Category', description: 'Test Description' } };
      
      const next = jest.fn();
      const objetoCategory = {
        categoryName: 'CDC',
        description: 'Sao Paulo',
        createdAt: '2024-01-01 00:00',
        updatedAt: '2024-01-01 00:00',
        };	
        //const categorydata = new category(objetoCategory);
      const res = { status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
        };
        
        useCaseCreate.mockResolvedValueOnce(objetoCategory);

      await categoryController().addNewCategory(req, res, next);
      expect(useCaseCreate).toHaveBeenCalledTimes(1);
      //expect(aa).toHaveBeenCalledWith(new category({objetoCategory}));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(objetoCategory);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle pending category creation', async () => {
      // Mock request body
      const req = {
        body: {
            categoryName: '', // This could trigger an error in your use case
            description: 'Test Description'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(), // Mocking res.status to return itself for chaining
        json: jest.fn()
    };
      const next = jest.fn();
      // Mock useCaseCreate function to throw an error
      const errorMessage = 'Category creation failed';
      
      useCaseCreate.mockRejectedValueOnce(new Error(errorMessage));
      // Call controller function
      await categoryController().addNewCategory(req, res, next);

      // Assertions
      expect(useCaseCreate).toHaveBeenCalledTimes(1);
      
      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith(errorMessage);
      //expect(next).not.toHaveBeenCalled();
    });
  
  });

  describe('Update Category', () => {
  
  it('should handle error during update category', async () => {
    // Mock request body
    const req = {
      params:{
        id:1,
      },
      body: {
          categoryName: 'Test Category', // This could trigger an error in your use case
          description: 'Test Description'
      },
      
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mocking res.status to return itself for chaining
      json: jest.fn()
    };
    const next = jest.fn();
    // Mock useCaseCreate function to throw an error
    const errorMessage = 'Category update failed';
    useCaseUpdateById.mockRejectedValueOnce(new Error(errorMessage));
    // Call controller function
    await categoryController().updateCategoryById(req, res, next);

    // Assertions
    expect(useCaseUpdateById).toHaveBeenCalledTimes(1);
    
    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith(errorMessage);
    //expect(next).not.toHaveBeenCalled();
  });

  // Test case for updateCategoryById
  it('updateCategoryById should update a category by ID', async () => {
    const req = { params: { id: '1' }, body: { categoryName: 'Updated Category', description: 'Updated Description' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    const next = jest.fn();
    const objetoCategory = {
      id: '1',
      categoryName: 'CDC',
      description: 'Sao Paulo',
      createdAt: '2024-01-01 00:00',
      updatedAt: '2024-01-01 00:00',
      };	
    useCaseUpdateById.mockResolvedValueOnce(objetoCategory);
    await categoryController().updateCategoryById(req, res, next);
    expect(useCaseUpdateById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('Category Updated'); // expect.any(Object)Assuming you're returning a success message
  });

  // Test case for updateCategoryById
  it('should return category not found', async () => {
    const req = { params: { id: '1' }, body: { categoryName: 'Updated Category', description: 'Updated Description' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    const next = jest.fn();
    const objetoCategory = {
      id: '2',
      categoryName: 'CDC',
      description: 'Sao Paulo',
      createdAt: '2024-01-01 00:00',
      updatedAt: '2024-01-01 00:00',
      };	
    useCaseUpdateById.mockResolvedValueOnce({ rowUpdate: 0 });
    await categoryController().updateCategoryById(req, res, next);
    expect(useCaseUpdateById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('No category found'); // expect.any(Object)Assuming you're returning a success message
  });
  });

  describe('Delete Category', () => {
  
    it('should handle error during delete category', async () => {
      // Mock request body
      const req = {
        params:{
          id:1,
        },
        body: {
            categoryName: 'Test Category', // This could trigger an error in your use case
            description: 'Test Description'
        },
        
      };
      const res = {
        status: jest.fn().mockReturnThis(), // Mocking res.status to return itself for chaining
        json: jest.fn()
      };
      const next = jest.fn();
      // Mock useCaseCreate function to throw an error
      const errorMessage = 'Category delete failed';
      useCasedelete.mockRejectedValueOnce(new Error(errorMessage));
      // Call controller function
      await categoryController().deleteCategoryById(req, res, next);
  
      // Assertions
      expect(useCasedelete).toHaveBeenCalledTimes(1);
      
      expect(res.status).toHaveBeenCalledWith(400);
  
      expect(res.json).toHaveBeenCalledWith(errorMessage);
      //expect(next).not.toHaveBeenCalled();
    });
  
    // Test case for updateCategoryById
    it('should delete a category by ID', async () => {
      const req = { params: { id: '1' }, body: { categoryName: 'Delete Category', description: 'Delete Description' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
      const next = jest.fn();
      const objetoCategory = {
        id: '1',
        categoryName: 'CDC',
        description: 'Sao Paulo',
        createdAt: '2024-01-01 00:00',
        updatedAt: '2024-01-01 00:00',
        };	
      useCasedelete.mockResolvedValueOnce(objetoCategory);
      await categoryController().deleteCategoryById(req, res, next);
      expect(useCasedelete).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('Category deleted'); // expect.any(Object)Assuming you're returning a success message
    });
  
    // Test case for updateCategoryById
    it('should return category not found', async () => {
      const req = { params: { id: '1' }, body: { categoryName: 'Delete Category', description: 'Delete Description' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
      const next = jest.fn();
      const objetoCategory = {
        id: '2',
        categoryName: 'CDC',
        description: 'Sao Paulo',
        createdAt: '2024-01-01 00:00',
        updatedAt: '2024-01-01 00:00',
        };	
      useCasedelete.mockResolvedValueOnce({ rowUpdate: 0 });
      await categoryController().deleteCategoryById(req, res, next);
      expect(useCasedelete).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('No category found'); // expect.any(Object)Assuming you're returning a success message
    });
    });
  
  describe('Find Category by ID', () => {
  
      it('should handle error during find category', async () => {
        // Mock request body
        const req = {
          params:{
            id:1,
          },         
        };
        const res = {
          status: jest.fn().mockReturnThis(), // Mocking res.status to return itself for chaining
          json: jest.fn()
        };
        const next = jest.fn();
        // Mock useCaseCreate function to throw an error
        const errorMessage = 'Category Find failed';
        useCaseFindById.mockRejectedValueOnce(new Error(errorMessage));
        // Call controller function
        await categoryController().fetchCategoryById(req, res, next);
    
        // Assertions
        expect(useCaseFindById).toHaveBeenCalledTimes(1);
        
        expect(res.status).toHaveBeenCalledWith(400);
    
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        //expect(next).not.toHaveBeenCalled();
      });
    
      // Test case for findCategoryById
      it('should find a category by ID', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
        const next = jest.fn();
        const objetoCategory = {
          id: '1',
          categoryName: 'CDC',
          description: 'Sao Paulo',
          createdAt: '2024-01-01 00:00',
          updatedAt: '2024-01-01 00:00',
          };	
        useCaseFindById.mockResolvedValueOnce(objetoCategory);
        await categoryController().fetchCategoryById(req, res, next);
        expect(useCaseFindById).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(objetoCategory); // expect.any(Object)Assuming you're returning a success message
      });
    
      // Test case for findCategoryById
      it('should return category not found', async () => {
        const req = { params: { id: '1' }};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
        const next = jest.fn();
        const objetoCategory = null;
        useCaseFindById.mockResolvedValueOnce(objetoCategory);
        await categoryController().fetchCategoryById(req, res, next);
        expect(useCaseFindById).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith('No category found'); // expect.any(Object)Assuming you're returning a success message
      });
    });
  describe('Find All Category', () => {
      it('should handle error during getAll category', async () => {
        // Mock request body
        const req = {
          params:{
            id:1,
          },         
        };
        const res = {
          status: jest.fn().mockReturnThis(), // Mocking res.status to return itself for chaining
          json: jest.fn()
        };
        const next = jest.fn();
        // Mock useCaseCreate function to throw an error
        const errorMessage = 'Category get all failed';
        useCasegetAll.mockRejectedValueOnce(new Error(errorMessage));
        // Call controller function
        await categoryController().fetchAllCategory(req, res, next);
    
        // Assertions
        expect(useCasegetAll).toHaveBeenCalledTimes(1);
        
        expect(res.status).toHaveBeenCalledWith(400);
    
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        //expect(next).not.toHaveBeenCalled();
      });
      //Test case for get All
      it('fetchAllCategory should fetch all categories', async () => {
        const req = {};
        const next = jest.fn();
        const objetoCategory = [{
          categoryName: 'CDC',
          description: 'Sao Paulo',
          createdAt: '2024-01-01 00:00',
          updatedAt: '2024-01-01 00:00',
          },{categoryName: 'CDC',
          description: 'Sao Paulo',
          createdAt: '2024-01-01 00:00',
          updatedAt: '2024-01-01 00:00',
          }];	
          //const categorydata = new category(objetoCategory);
        const res = { status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
          };
        useCasegetAll.mockResolvedValueOnce(objetoCategory);
        await categoryController().fetchAllCategory(req, res, next);
        expect(useCasegetAll).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array)); // Assuming you're returning an array of categories
      });
      //Test case for get All
      it('should return category not found get All', async () => {
        const req = { params: { id: '1' }};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
        const next = jest.fn();
        const objetoCategory = null;
        useCasegetAll.mockResolvedValueOnce(objetoCategory);
        await categoryController().fetchAllCategory(req, res, next);
        expect(useCasegetAll).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith('No category found'); // expect.any(Object)Assuming you're returning a success message
      });
  });
});
