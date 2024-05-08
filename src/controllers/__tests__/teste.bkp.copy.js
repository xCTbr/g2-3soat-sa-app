import categoryController from '../categoryController.js';
import useCaseCreate from '../../use_cases/category/add.js';
import useCasegetAll from '../../use_cases/category/getAll.js';
import useCaseFindById from '../../use_cases/category/findById.js';
import useCasedelete from '../../use_cases/category/deleteById.js';
import useCaseUpdateById from '../../use_cases/category/updateById.js';


// Mocking use case functions
jest.mock('../../use_cases/category/add.js');
jest.mock('../../use_cases/category/getAll');
jest.mock('../../use_cases/category/findById');
jest.mock('../../use_cases/category/deleteById');
jest.mock('../../use_cases/category/updateById');

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

  //describe('addNewCategory', () => {
    /*const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next = jest.fn();*/

    /*it('should add a new category', async () => {
      const req = {};
      const res = {
      //status: jest.fn(() => res),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      };
    const next = jest.fn();
      // Mock request body
      req.body = { categoryName: 'Test Category', description: 'Test Description' };
      
      const mockCategory = new category(
        { categoryName: 'Test Category', description: 'Test Description',
        createdAt: Date,updatedAt:Date });
      
      // Mock useCaseCreate function
      //useCaseCreate.mockResolvedValueOnce({ categoryName: 'Test Category', description: 'Test Description' });
      useCaseCreate.mockResolvedValueOnce(mockCategory);
      // Call controller function
      await categoryController().addNewCategory(req, res, next);

      // Assertions
      expect(useCaseCreate).toHaveBeenCalledTimes(1);
      //expect(useCaseCreate).toHaveBeenCalledWith(mockCategory);
      //expect(useCaseCreate).toHaveBeenCalledWith('Test Category', 'Test Description', expect.any(String), expect.any(String));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCategory);
      expect(useCaseCreate).toHaveBeenCalledTimes(1);
    });*/

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
      //jest.mock('../../use_cases/category/add.js').fn().mockResolvedValueOnce(new Error('Some error'));
      //useCaseCreate.mockResolvedValueOnce({ categoryName: 'Test Category', description: 'Test Description' });
      useCaseCreate.mockRejectedValueOnce(new Error(errorMessage));
      // Call controller function
      await categoryController().addNewCategory(req, res, next);

      // Assertions
      expect(useCaseCreate).toHaveBeenCalledTimes(1);
      //const ress= res.status.mock.calls[0][0];
      //expect(useCaseCreate).toHaveBeenCalledWith('Test Category', 'Test Description', expect.any(String), expect.any(String));
      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith(errorMessage);
      //expect(next).not.toHaveBeenCalled();
    });
  //});

  // Write similar tests for other controller functions (fetchAllCategory, fetchCategoryById, deleteCategoryById, updateCategoryById)

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

  /*test('new categorys', async () => {
    const req = { body: { categoryName: 'Test Category', description: 'Test Description' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    await categoryController().addNewCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object)); // Assuming you're returning a category object
});*/

});
